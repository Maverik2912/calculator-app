import {Dispatch, SetStateAction} from "react";

import {ICalculatorHistoryRecord, IMathOperations} from "@common-interfaces";

export interface ICalculatorContext {
    mathOperations: IMathOperations,
    inputValue: string;
    setInputValue: Dispatch<SetStateAction<string>>;
    history: ICalculatorHistoryRecord[];
    setHistory: Dispatch<SetStateAction<ICalculatorHistoryRecord[]>>;
}