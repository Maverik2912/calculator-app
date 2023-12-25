import {NextFunction, Request, Response} from "express";

import {modulesRegistry} from "@modules";
import {historyService} from "../services";
import {IHistoryControllerResponse} from "../interfaces";
import {HistoryModuleState, InstanceName} from "../enums";
import {textMessages} from "@texts";
import {LoggerUtil} from "@modules/logger/utils";

class HistoryController {
    public async getHistoryList(req: Request, res: Response, next: NextFunction): Promise<Response<IHistoryControllerResponse>> {
        const {
            HISTORY_DISABLED,
            GET_HISTORY_LIST_ERROR,
            INVOKE_SERVICE_GET_HISTORY
        } = textMessages.modules.history.controller;

        LoggerUtil.getLogger().logInfo({
            message: textMessages.workStatus.START,
            instanceName: InstanceName.HISTORY_CONTROLLER_GET_HISTORY
        });

        try {
            const historyModuleState = modulesRegistry.History.state;
            let resBody: IHistoryControllerResponse;

            if (historyModuleState === HistoryModuleState.DISABLED) {
                resBody = {historyModuleState};
                LoggerUtil.getLogger().logDebug({message: HISTORY_DISABLED, instanceName: InstanceName.HISTORY_CONTROLLER_GET_HISTORY});
            } else {
                LoggerUtil.getLogger().logDebug({
                    message: INVOKE_SERVICE_GET_HISTORY,
                    instanceName: InstanceName.HISTORY_CONTROLLER_GET_HISTORY
                });
                const calculatorHistoryRecords = await historyService.getHistoryList(req.query.limit as string);
                resBody = {historyModuleState, calculatorHistoryRecords};
            }

            LoggerUtil.getLogger().logInfo({
                message: textMessages.workStatus.FINISH,
                instanceName: InstanceName.HISTORY_CONTROLLER_GET_HISTORY
            });
            return res.status(200).json(resBody);
        } catch (e) {
            LoggerUtil.getLogger().logError({message: GET_HISTORY_LIST_ERROR, metadata: {error: e.message}});
            next(e);
        }
    }
}

export const historyController = new HistoryController();