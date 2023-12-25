import winston, {Logger} from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

import {LogLevel} from "./enums";
import {loggerConstants} from "./constants";
import {configs} from "@configs";
import {ILogParams} from "./interfaces";

export class LoggerModule {
    protected logger: Logger;

    constructor(level: string) {
        this.logger = this.createLogger(level);
    }

    public logInfo({message, metadata, instanceName}: ILogParams): void {
        this.logger.info(message, {...metadata, instanceName});
    }

    public logDebug({message, metadata, instanceName}: ILogParams): void {
        this.logger.debug(message, {...metadata, instanceName});
    }

    public logWarning({message, metadata, instanceName}: ILogParams): void {
        this.logger.warn(message, {...metadata, instanceName});
    }

    public logError({message, metadata, instanceName}: ILogParams): void {
        this.logger.error(message, {...metadata, instanceName});
    }

    protected createLogger(level: string): Logger {
        const transports = loggerConstants.transports.map(({filename, level}) => this.createTransport(filename, level));
        const {combine, timestamp, json} = winston.format;

        return winston.createLogger({
            level,
            format: combine(timestamp(), json()),
            transports: [
                ...transports,
                new winston.transports.Console(),
            ],
        });
    }

    protected createTransport(filename: string, level: LogLevel): DailyRotateFile {
        const {zippedArchive, maxSize, maxFiles, datePattern} = loggerConstants;

        return new DailyRotateFile({
            filename,
            level,
            datePattern,
            zippedArchive,
            maxSize,
            maxFiles,
        });
    }

}

export const loggerModule = new LoggerModule(configs.LOG_LEVEL);