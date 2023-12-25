import {IAdaptersRegistry} from "../interfaces";
import {PostgreSqlAdapter} from "./postgresql-adapter";
import {ICalculatorHistoryRecord} from "@src/common-interfaces";
import {MongoDbAdapter} from "./mongodb-adapter";

export const adaptersRegistry: IAdaptersRegistry<ICalculatorHistoryRecord> = {
    mongodb: {
        Constructor: MongoDbAdapter,
    },
    postgresql: {
        Constructor: PostgreSqlAdapter,
    }
}