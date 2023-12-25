import {NextFunction, Request, Response} from "express";

import {modulesRegistry} from "@modules";
import {formatterService, inputParserService} from "../../services";
import {HistoryModuleState} from "../../../history/enums";
import {textMessages} from "@texts";
import {InstanceName} from "../../enums";
import {LoggerUtil} from "@modules/logger/utils";

class ExpressionController {
    public async calculateAndSaveToDb(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {
            RECEIVED_EXPRESSION,
            NOT_FORMATTED_RESULT,
            FORMATTED_RESULT,
            PARSED_BY_PARENTHESES,
            INVOKE_HISTORY_SERVICE_CREATE,
            CALCULATE_ERROR
        } = textMessages.modules.calculator.controller.expression;
        LoggerUtil.getLogger().logInfo({message: textMessages.workStatus.START, instanceName: InstanceName.EXPRESSION_CONTROLLER_CALCULATE});

        try {
            const expression = req.body.expression;
            LoggerUtil.getLogger().logDebug({message: RECEIVED_EXPRESSION, metadata: {expression}, instanceName: InstanceName.EXPRESSION_CONTROLLER_CALCULATE});

            const parsedValue = inputParserService.parseInputOrThrow(expression);
            LoggerUtil.getLogger().logDebug({message: PARSED_BY_PARENTHESES, metadata: {parsedValue}, instanceName: InstanceName.EXPRESSION_CONTROLLER_CALCULATE});

            const result = inputParserService.parseAndCalculateExpression(parsedValue);
            LoggerUtil.getLogger().logDebug({message: NOT_FORMATTED_RESULT, metadata: {result}, instanceName: InstanceName.EXPRESSION_CONTROLLER_CALCULATE});

            const formattedResult = formatterService.formatAndRoundNumber(+result);
            LoggerUtil.getLogger().logDebug({message: FORMATTED_RESULT, metadata: {formattedResult}, instanceName: InstanceName.EXPRESSION_CONTROLLER_CALCULATE});

            res.status(200).json({
                result: formattedResult
            });

            if (modulesRegistry.History.state === HistoryModuleState.ENABLED) {
                LoggerUtil.getLogger().logDebug({message: INVOKE_HISTORY_SERVICE_CREATE, metadata: {result: formattedResult, expression}, instanceName: InstanceName.EXPRESSION_CONTROLLER_CALCULATE});
                await modulesRegistry.History.Services.create({result: formattedResult, expression});
            }
            LoggerUtil.getLogger().logInfo({message: textMessages.workStatus.FINISH, instanceName: InstanceName.EXPRESSION_CONTROLLER_CALCULATE});
        } catch (e) {
            LoggerUtil.getLogger().logError({message: CALCULATE_ERROR, metadata: {error: e.message}});
            next(e);
        }
    }
}

export const expressionController = new ExpressionController();