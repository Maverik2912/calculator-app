import {LoggerModule} from "../LoggerModule";

export interface ILoggerRegistry {
    [key: string]: LoggerModule;
}