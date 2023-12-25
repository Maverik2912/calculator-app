import {Client} from 'pg';

import {IDatabaseAdapter} from "../../interfaces";
import {textMessages} from "@texts";
import {NotFoundException} from "@errors";
import {WithIdOrNever} from "../../types";
import {configs} from "@configs";
import {InstanceName} from "../../enums";
import {connectionStrings} from "@src/odm/constants";
import {LoggerUtil} from "@modules/logger/utils";

export class PostgreSqlAdapter<T> implements IDatabaseAdapter<T> {
    protected client: Client;
    protected readonly collectionTitle = configs.COLLECTION_TITLE;

    constructor() {
        this.client = new Client({
            connectionString: connectionStrings.postgres,
        });
    }

    public async connect(): Promise<void> {
        const {CONNECTION_SUCCESS, CONNECTION_FAILED} = textMessages.db;

        try {
            await this.client.connect();
            await this.createTableIfNeeded();
            LoggerUtil.getLogger().logInfo({message: CONNECTION_SUCCESS});
        } catch (e) {
            LoggerUtil.getLogger().logError({message: CONNECTION_FAILED, metadata: {error: e.message}, instanceName: InstanceName.POSTGRES});
            throw new Error(e.message);
        }
    }

    public async disconnect(): Promise<void> {
        const {DISCONNECT_SUCCESS, DISCONNECT_FAILED} = textMessages.db;

        try {
            await this.client.end();
            LoggerUtil.getLogger().logInfo({message: DISCONNECT_SUCCESS});
        } catch (e) {
            LoggerUtil.getLogger().logError({message: DISCONNECT_FAILED, metadata: {error: e.message}, instanceName: InstanceName.POSTGRES});
            throw new Error(e.message);
        }
    }

    public async getOneByField(fieldName: keyof T, value: string): Promise<T> {
        const {db: {ITEM_RETRIEVED}, error: {RETRIEVE_FROM_HISTORY}} = textMessages;

        try {
            const result = await this.client.query(`SELECT *
                                                    FROM ${this.collectionTitle}
                                                    WHERE ${String(fieldName)} = $1`, [value]);

            LoggerUtil.getLogger().logInfo({message: ITEM_RETRIEVED, metadata: {item: result.rows[0]}});
            return result.rows[0];
        } catch (e) {
            LoggerUtil.getLogger().logError({message: RETRIEVE_FROM_HISTORY, metadata: {error: e.message}, instanceName: InstanceName.POSTGRES});
            throw new Error(e.message);
        }
    }

    public async getLatestItems(count: number): Promise<T[]> {
        const {db: {ITEMS_RETRIEVED}, error: {RETRIEVE_FROM_HISTORY}} = textMessages;

        count = count || Number.MAX_SAFE_INTEGER;
        try {
            const result = await this.client.query(`SELECT *
                                                    FROM ${this.collectionTitle}
                                                    ORDER BY timestamp DESC LIMIT $1`, [count]);

            LoggerUtil.getLogger().logInfo({message: ITEMS_RETRIEVED, metadata: {items: result.rows}});
            return result.rows;
        } catch (e) {
            LoggerUtil.getLogger().logError({message: RETRIEVE_FROM_HISTORY, metadata: {error: e.message}, instanceName: InstanceName.POSTGRES});
            throw new Error(e.message);
        }
    }

    public async create(expression: string, result: string): Promise<T> {
        const {db: {ITEM_ADDED}, error: {SAVE_TO_DB}} = textMessages;

        try {
            const results = await this.client.query(
                `INSERT INTO ${this.collectionTitle} (expression, result, timestamp)
                 VALUES ($1, $2, NOW()) RETURNING *`,
                [expression, result]
            );

            LoggerUtil.getLogger().logInfo({message: ITEM_ADDED, metadata: {item: results.rows[0]}});
            return results.rows[0];
        } catch (e) {
            LoggerUtil.getLogger().logError({message: SAVE_TO_DB, metadata: {error: e.message}, instanceName: InstanceName.POSTGRES});
            throw new Error(e.message);
        }
    }

    public async updateOneByFilterObject(filterObject: Partial<T>, dto: Partial<T>): Promise<T> {
        const {db: {ITEM_UPDATED}, error: {UPDATE_ITEM, NOT_FOUND}} = textMessages;

        try {
            const item = await this.getOneByField(
                Object.keys(filterObject)[0] as keyof T,
                Object.values(filterObject)[0].toString()) as WithIdOrNever<T>;

            if (item) {
                const columnsToUpdate = Object.keys(dto).map((key, index) => `${key} = $${index + 1}`).join(', ');
                const updateQuery = {
                    text: `UPDATE ${this.collectionTitle}
                           SET ${columnsToUpdate}
                           WHERE id = $${Object.keys(dto).length + 1} RETURNING *`,
                    values: [...Object.values(dto), item.id],
                };

                const result = await this.client.query(updateQuery);
                LoggerUtil.getLogger().logInfo({message: ITEM_UPDATED, metadata: {item: result.rows[0]}});
                return result.rows[0];
            } else {
                LoggerUtil.getLogger().logWarning({message: NOT_FOUND, metadata: {filterObject}, instanceName: InstanceName.POSTGRES});
                throw new NotFoundException();
            }
        } catch (e) {
            LoggerUtil.getLogger().logError({message: UPDATE_ITEM, metadata: {error: e.message}, instanceName: InstanceName.POSTGRES});
            throw new Error(e.message);
        }
    }

    public async deleteOneById(id: string): Promise<void> {
        const {db: {ITEM_DELETED}, error: {DELETE_ITEM}} = textMessages;

        try {
            await this.client.query(`DELETE
                                     FROM ${this.collectionTitle}WHERE id = $1`, [id]);
            LoggerUtil.getLogger().logInfo({message: ITEM_DELETED, metadata: {id}});
        } catch (e) {
            LoggerUtil.getLogger().logError({message: DELETE_ITEM, metadata: {error: e.message}, instanceName: InstanceName.POSTGRES});
            throw new Error(e.message);
        }
    }

    public async deleteExpiredItemsByTimestamp(timestamp: string): Promise<void> {
        const {db: {DELETED_EXPIRED_ITEMS}, error: {DELETE_ITEMS}} = textMessages;

        try {
            await this.client.query(`DELETE
                                     FROM ${this.collectionTitle}WHERE "timestamp" < $1`, [timestamp]);
            LoggerUtil.getLogger().logInfo({message: DELETED_EXPIRED_ITEMS});
        } catch (e) {
            LoggerUtil.getLogger().logError({message: DELETE_ITEMS, metadata: {error: e.message}, instanceName: InstanceName.POSTGRES});
            throw new Error(e.message);
        }
    }

    protected async createTableIfNeeded(): Promise<void> {
        const {db: {COLLECTION_CREATED}, error: {CREATE_COLLECTION}} = textMessages;

        try {
            await this.client.query(
                `CREATE TABLE IF NOT EXISTS ${this.collectionTitle}
                 (
                     id SERIAL PRIMARY KEY,
                     expression TEXT,
                     result TEXT,
                     timestamp TIMESTAMP
                 )`
            );
            LoggerUtil.getLogger().logInfo({message: COLLECTION_CREATED});
        } catch (e) {
            LoggerUtil.getLogger().logError({message: CREATE_COLLECTION, metadata: {error: e.message}, instanceName: InstanceName.POSTGRES});
            throw new Error(e.message);
        }
    }
}