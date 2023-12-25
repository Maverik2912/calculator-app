import {IDatabaseAdapter} from "./databaseAdapter.interface";

export interface IAdaptersRegistry<T> {
    [key: string]: IAdapterRegistry<T>;
}
interface IAdapterRegistry<T> {
    Constructor: new () => IDatabaseAdapter<T>,
}