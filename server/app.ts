import express, {NextFunction, Request, Response} from "express";
import cors from 'cors'

import {odmRegistry} from "@odm";
import {modulesRegistry} from "@modules";
import {configs} from "@configs";
import {globalRouter} from "@routers";
import {HttpException} from "@src/errors/HttpException";
import {textMessages} from "@texts";
import {cronRunner} from "@modules/history/crones";
import {HistoryModuleState} from "@modules/history/enums";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    methods: ['GET', 'POST'],
}));

app.use(globalRouter);

app.use((err: HttpException, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || 500;
    res.status(status).json({
        result: err.message,
    });
});

app.listen(configs.PORT, () => {
    if(modulesRegistry.History.state === HistoryModuleState.ENABLED) {
        cronRunner();
        odmRegistry.getCurrentAdapter().connect();
    }
    modulesRegistry.Logger.logInfo({message: textMessages.server.START_MESSAGE});
});