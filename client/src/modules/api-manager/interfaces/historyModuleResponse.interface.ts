import {ICalculatorHistoryRecord} from "@common-interfaces";
import {HistoryModuleState} from "@common-enums";

export interface IHistoryModuleResponse {
    calculatorHistoryRecords?: ICalculatorHistoryRecord[],
    historyModuleState: HistoryModuleState,
}