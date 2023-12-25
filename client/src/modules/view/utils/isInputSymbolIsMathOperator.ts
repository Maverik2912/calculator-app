import {IMathOperations} from "@common-interfaces";

export const isInputSymbolIsMathOperator = (symbol: string, mathOperations: IMathOperations): boolean => {
    return Object.keys(mathOperations).includes(symbol);
}