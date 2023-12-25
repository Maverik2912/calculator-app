import {Collection, Filter, MongoClient, ObjectId, OptionalUnlessRequiredId, WithId} from "mongodb";

import {IDatabaseAdapter} from "../../interfaces";
import {textMessages} from "@texts";
import {NotFoundException} from "@errors";
import {configs} from "@configs";
import {InstanceName} from "../../enums";
import {connectionStrings} from "@src/odm/constants";
import {LoggerUtil} from "@modules/logger/utils";

export class MongoDbAdapter<T> implements IDatabaseAdapter<T> {
    protected client: MongoClient;
    protected collection: Collection<T>;

    constructor() {
        this.client = new MongoClient(connectionStrings.mongodb);
    }

    public async connect() {
        const {CONNECTION_FAILED, CONNECTION_SUCCESS} = textMessages.db;

        try {
            await this.client.connect();
            await this.ensureCollectionExists();
            LoggerUtil.getLogger().logInfo({message: CONNECTION_SUCCESS});
        } catch (e) {
            LoggerUtil.getLogger().logError({
                message: CONNECTION_FAILED,
                metadata: {error: e.message},
                instanceName: InstanceName.MONGO_DB
            });
            throw new Error(e.message);
        }
    }

    public async disconnect() {
        const {DISCONNECT_SUCCESS, DISCONNECT_FAILED} = textMessages.db;

        try {
            await this.client.close();
            LoggerUtil.getLogger().logInfo({message: DISCONNECT_SUCCESS});
        } catch (e) {
            LoggerUtil.getLogger().logError({
                message: DISCONNECT_FAILED,
                metadata: {error: e.message},
                instanceName: InstanceName.MONGO_DB
            });
            throw new Error(e.message);
        }
    }

    public async getOneByField(fieldName: keyof T, value: string): Promise<T> {
        const {db: {ITEM_RETRIEVED}, error: {RETRIEVE_FROM_HISTORY}} = textMessages;

        try {
            const filterObject = {[fieldName]: value} as Filter<T>;
            const result = await this.collection.findOne(filterObject);
            LoggerUtil.getLogger().logInfo({message: ITEM_RETRIEVED, metadata: {result}});
            return result as T;
        } catch (e) {
            LoggerUtil.getLogger().logError({
                message: RETRIEVE_FROM_HISTORY,
                metadata: {error: e.message},
                instanceName: InstanceName.MONGO_DB
            });
            throw new Error(e.message);
        }
    }

    public async getLatestItems(count: number): Promise<T[]> {
        const {db: {ITEMS_RETRIEVED}, error: {RETRIEVE_FROM_HISTORY}} = textMessages;

        try {
            const result = await this.collection
                .find()
                .sort({timestamp: -1})
                .limit(count)
                .toArray();

            LoggerUtil.getLogger().logInfo({message: ITEMS_RETRIEVED, metadata: {result}});
            return result as T[];
        } catch (e) {
            LoggerUtil.getLogger().logError({
                message: RETRIEVE_FROM_HISTORY,
                metadata: {error: e.message},
                instanceName: InstanceName.MONGO_DB
            });
            throw new Error(e.message);
        }
    }

    public async create(expression: string, result: string): Promise<T> {
        const {db: {ITEM_ADDED}, error: {SAVE_TO_DB}} = textMessages;

        try {
            const item = {
                timestamp: new Date().toISOString(),
                expression,
                result
            } as T;

            await this.collection.insertOne(item as OptionalUnlessRequiredId<T>);
            LoggerUtil.getLogger().logInfo({message: ITEM_ADDED, metadata: {item}});
            return item;
        } catch (e) {
            LoggerUtil.getLogger().logError({
                message: SAVE_TO_DB,
                metadata: {error: e.message},
                instanceName: InstanceName.MONGO_DB
            });
            throw new Error(e.message);
        }
    }

    public async updateOneByFilterObject(filterObject: Partial<T>, dto: Partial<T>): Promise<T> {
        const {db: {ITEM_UPDATED}, error: {UPDATE_ITEM, NOT_FOUND}} = textMessages;

        try {
            const filterWithId = filterObject as WithId<T>;
            const result = await this.collection.findOneAndUpdate(filterWithId, {$set: dto}, {returnDocument: 'after'});

            if (!result) {
                LoggerUtil.getLogger().logError({
                    message: NOT_FOUND,
                    metadata: {filterObject},
                    instanceName: InstanceName.MONGO_DB
                });
                throw new NotFoundException();
            }
            LoggerUtil.getLogger().logInfo({message: ITEM_UPDATED, metadata: {result}});
            return result as T;
        } catch (e) {
            LoggerUtil.getLogger().logError({
                message: UPDATE_ITEM,
                metadata: {error: e.message},
                instanceName: InstanceName.MONGO_DB
            });
            throw new Error(e.message);
        }
    }

    public async deleteOneById(id: string): Promise<void> {
        const {db: {ITEM_DELETED}, error: {DELETE_ITEM}} = textMessages;

        try {
            const filterObject = {_id: new ObjectId(id)} as Filter<T>;
            await this.collection.deleteOne(filterObject);
            LoggerUtil.getLogger().logInfo({message: ITEM_DELETED, metadata: {id}});
        } catch (e) {
            LoggerUtil.getLogger().logError({
                message: DELETE_ITEM,
                metadata: {error: e.message},
                instanceName: InstanceName.MONGO_DB
            });
            throw new Error(e.message);
        }
    }

    public async deleteExpiredItemsByTimestamp(currentTimestamp: string): Promise<void> {
        const {db: {DELETED_EXPIRED_ITEMS}, error: {DELETE_ITEMS}} = textMessages;

        try {
            const filterObject = {timestamp: {$lte: currentTimestamp}} as unknown as Filter<T>;
            await this.collection.deleteMany(filterObject);
            LoggerUtil.getLogger().logInfo({message: DELETED_EXPIRED_ITEMS});
        } catch (e) {
            LoggerUtil.getLogger().logError({
                message: DELETE_ITEMS,
                metadata: {error: e.message},
                instanceName: InstanceName.MONGO_DB
            });
            throw new Error(e.message);
        }
    }

    protected async ensureCollectionExists(): Promise<void> {
        const {db: {COLLECTION_CREATED}, error: {CREATE_COLLECTION}} = textMessages;

        try {
            const collectionTitle = configs.COLLECTION_TITLE;

            const database = this.client.db();
            const collection = await database.listCollections({name: collectionTitle}).toArray();

            if (!collection.length) {
                await database.createCollection(collectionTitle);
                LoggerUtil.getLogger().logInfo({message: COLLECTION_CREATED});
            }

            this.collection = database.collection(collectionTitle);
        } catch (e) {
            LoggerUtil.getLogger().logError({
                message: CREATE_COLLECTION,
                metadata: {error: e.message},
                instanceName: InstanceName.MONGO_DB
            });
            throw new Error(e.message);
        }
    }
}
