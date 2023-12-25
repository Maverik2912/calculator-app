import {apiService} from "../api-service";
import {urls} from "../../constants";
import {IHistoryModuleResponse} from "../../interfaces";

export const historyService = {
    getHistory: (limit: number) => apiService.get<IHistoryModuleResponse>(urls.history, {params: {limit}}),
}