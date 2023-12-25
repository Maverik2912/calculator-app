import {historyRepository} from "../repositories";
import {ICalculatorRecord} from "../interfaces";
import {ICalculatorHistoryRecord} from "@src/common-interfaces";
import {textMessages} from "@texts";
import {InstanceName} from "../enums";
import {LoggerUtil} from "@modules/logger/utils";

class HistoryService {
    public async create(dto: ICalculatorRecord): Promise<ICalculatorHistoryRecord> {
        const {INVOKE_REPO_GET_ONE, INVOKE_REPO_UPDATE_ONE, INVOKE_REPO_CREATE, CREATE_ERROR} = textMessages.modules.history.service;

        LoggerUtil.getLogger().logInfo({message: textMessages.workStatus.START, instanceName: InstanceName.HISTORY_SERVICE_CREATE});

        try {
            const {expression} = dto;
            LoggerUtil.getLogger().logDebug({message: INVOKE_REPO_GET_ONE, instanceName: InstanceName.HISTORY_SERVICE_CREATE, metadata: {fieldName: "expression", value: expression}});
            const calculatorItem = await historyRepository.getOneByField("expression", expression);

            if (calculatorItem) {
                LoggerUtil.getLogger().logDebug({message: INVOKE_REPO_UPDATE_ONE, instanceName: InstanceName.HISTORY_SERVICE_CREATE, metadata: {itemToUpdate: calculatorItem}});
                const updatedItem = await historyRepository.updateOneByDto(calculatorItem, {timestamp: new Date().toISOString()});
                LoggerUtil.getLogger().logInfo({message: textMessages.workStatus.FINISH, instanceName: InstanceName.HISTORY_SERVICE_CREATE});
                return updatedItem;
            } else {
                LoggerUtil.getLogger().logDebug({message: INVOKE_REPO_CREATE, instanceName: InstanceName.HISTORY_SERVICE_CREATE, metadata: {dto}});
                const createdItem = await historyRepository.create(dto);
                LoggerUtil.getLogger().logInfo({message: textMessages.workStatus.FINISH, instanceName: InstanceName.HISTORY_SERVICE_CREATE});
                return createdItem;
            }
        } catch (e) {
            LoggerUtil.getLogger().logError({message: CREATE_ERROR, metadata: {error: e.message}});
            throw new Error(e.message);
        }
    }

    public async getHistoryList(limit: string): Promise<ICalculatorHistoryRecord[]> {
        const {INVOKE_REPO_GET_MANY, GET_HISTORY_LIST_ERROR} = textMessages.modules.history.service;
        LoggerUtil.getLogger().logInfo({message: textMessages.workStatus.START, instanceName: InstanceName.HISTORY_SERVICE_GET_HISTORY});

        try {
            LoggerUtil.getLogger().logDebug({message: INVOKE_REPO_GET_MANY, instanceName: InstanceName.HISTORY_CONTROLLER_GET_HISTORY, metadata: {limit}});
            const historyList = await historyRepository.getMany(limit);
            LoggerUtil.getLogger().logInfo({message: textMessages.workStatus.FINISH, instanceName: InstanceName.HISTORY_SERVICE_GET_HISTORY});
            return historyList;
        } catch(e) {
            LoggerUtil.getLogger().logError({message: GET_HISTORY_LIST_ERROR, metadata: {error: e.message}});
            throw new Error(e.message);
        }
    }
}

export const historyService = new HistoryService();