export interface IDatabaseAdapter<T> {
    connect(): void;
    disconnect(): void;
    getOneByField(fieldName: keyof T, value: string): Promise<T>;
    getLatestItems(count: number): Promise<T[]>;
    create(expression: string, result: string): Promise<T>;
    updateOneByFilterObject(filterObject: Partial<T>, dto: Partial<T>): Promise<T>;
    deleteOneById(id: string): Promise<void>;
    deleteExpiredItemsByTimestamp(timestamp: string): Promise<void>;
}