import path from "path";

import {LogLevel} from "../enums";

const logsDir = path.resolve(process.cwd(), 'logs');

export const loggerConstants = {
    transports: [
        {level: LogLevel.INFO, filename: path.resolve(logsDir, 'info.log')},
        {level: LogLevel.DEBUG, filename: path.resolve(logsDir, 'debug.log')},
        {level: LogLevel.WARN, filename: path.resolve(logsDir, 'warn.log')},
        {level: LogLevel.ERROR, filename: path.resolve(logsDir, 'error.log')},
    ],
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
}