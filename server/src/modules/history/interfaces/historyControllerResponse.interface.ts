import {ICalculatorHistoryRecord} from "@src/common-interfaces";
import {HistoryModuleState} from "../enums";

export interface IHistoryControllerResponse {
    calculatorHistoryRecords?: ICalculatorHistoryRecord[],
    historyModuleState: HistoryModuleState,
}