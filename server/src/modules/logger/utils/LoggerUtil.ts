import {LoggerModule} from "@modules/logger/LoggerModule";
import {modulesRegistry} from "@modules";

export class LoggerUtil {
    protected static logger: LoggerModule;

    public static getLogger(): LoggerModule {
        if(!LoggerUtil.logger) {
            LoggerUtil.logger = modulesRegistry.Logger;
        }
        return LoggerUtil.logger;
    }
}