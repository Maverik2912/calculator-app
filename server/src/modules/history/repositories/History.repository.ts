import {odmRegistry} from "@odm";
import {ICalculatorRecord} from "../interfaces";
import {ICalculatorHistoryRecord} from "@src/common-interfaces";

class HistoryRepository {
    public async create({expression, result}: ICalculatorRecord): Promise<ICalculatorHistoryRecord> {
        return odmRegistry.getCurrentAdapter().create(expression, result);
    }

    public async getOneByField(fieldName: keyof ICalculatorHistoryRecord, value: string): Promise<ICalculatorHistoryRecord> {
        return odmRegistry.getCurrentAdapter().getOneByField(fieldName, value);
    }

    public async getMany(limit: string): Promise<ICalculatorHistoryRecord[]> {
        return odmRegistry.getCurrentAdapter().getLatestItems(+limit);
    }

    public async deleteOneById(id: string): Promise<void> {
        await odmRegistry.getCurrentAdapter().deleteOneById(id);
    }

    public async deleteManyByTimestamp(timestamp: string): Promise<void> {
        await odmRegistry.getCurrentAdapter().deleteExpiredItemsByTimestamp(timestamp);
    }

    public async updateOneByDto(filterObject: Partial<ICalculatorHistoryRecord>, dto: Partial<ICalculatorHistoryRecord>): Promise<ICalculatorHistoryRecord> {
        return odmRegistry.getCurrentAdapter().updateOneByFilterObject(filterObject, dto);
    }
}

export const historyRepository = new HistoryRepository();