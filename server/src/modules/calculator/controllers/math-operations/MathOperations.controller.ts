import {NextFunction, Request, Response} from "express";

import {mathOperationsService} from "../../services";
import {IMathOperations} from "../../interfaces";
import {textMessages} from "@texts";
import {InstanceName} from "../../enums";
import {LoggerUtil} from "@modules/logger/utils";

class MathOperationsController {
    public getData(_req: Request, res: Response, next: NextFunction): Response<IMathOperations> {
        const {INVOKE_SERVICE_GET_DATA, GET_DATA_ERROR} = textMessages.modules.calculator.controller.mathOperations;
        LoggerUtil.getLogger().logInfo({message: textMessages.workStatus.START, instanceName: InstanceName.MATH_OPERATIONS_CONTROLLER_GET_DATA});

        try {
            LoggerUtil.getLogger().logDebug({message: INVOKE_SERVICE_GET_DATA, instanceName: InstanceName.MATH_OPERATIONS_CONTROLLER_GET_DATA});
            const mathOperations = mathOperationsService.getData();
            LoggerUtil.getLogger().logDebug({message: textMessages.db.ITEMS_RETRIEVED, instanceName: InstanceName.MATH_OPERATIONS_CONTROLLER_GET_DATA});
            LoggerUtil.getLogger().logInfo({message: textMessages.workStatus.FINISH, instanceName: InstanceName.MATH_OPERATIONS_CONTROLLER_GET_DATA});

            return res.status(200).json({
                result: mathOperations,
            });
        } catch(e) {
            LoggerUtil.getLogger().logError({message: GET_DATA_ERROR, metadata: {error: e.message}});
            next(e);
        }
    }
}

export const mathOperationsController = new MathOperationsController();