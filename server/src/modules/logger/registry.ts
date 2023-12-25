import {loggerModule} from "./LoggerModule";
import {ILoggerRegistry} from "./interfaces";

export const loggerModuleRegistry: ILoggerRegistry = {
    loggerModule,
}