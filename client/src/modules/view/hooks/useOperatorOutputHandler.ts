import {MouseEvent, useContext} from "react";

import {OperatorType} from "@common-enums";
import {ButtonsContext, CalculatorContext} from "../context";
import {IUpdatedInputValue} from "../interfaces";
import {SymbolType} from "../enums";
import {isInputSymbolIsMathOperator} from "../utils";
import {IMathOperation, IMathOperations} from "@common-interfaces";

const checkIsFirstSymbolAndSingleOperand = (currentSymbolOperands: number, inputValue: string): boolean => {
    return inputValue === SymbolType.ZERO && currentSymbolOperands === 1;
}

const getMathOperationByInnerText = (innerText: string, mathOperations: IMathOperations): IMathOperation => {
    return Object.values(mathOperations).find((operation) => innerText === operation.outputText);
}

export const useOperatorOutputHandler = () => {
    const {mathOperations, inputValue} = useContext(CalculatorContext);
    const {setParenthesesOffset, lastSymbolIndex, lastSymbol} = useContext(ButtonsContext);

    const handleParenthesesAfterOperand = (isFirstSymbolAndSingleOperand: boolean, currentSymbol: string): IUpdatedInputValue => {
        let startIndex: number;
        let valueToInsert: string;
        let endIndex = lastSymbolIndex;

        if (inputValue !== SymbolType.ZERO && (isFinite(+lastSymbol) || lastSymbol === SymbolType.CLOSING_PARENTHESIS)) {
            startIndex = 0;
            valueToInsert = SymbolType.EMPTY;
        } else {
            setParenthesesOffset(prevState => prevState - 1);

            startIndex = isFirstSymbolAndSingleOperand ? 1 : 0;
            valueToInsert = `${currentSymbol}${SymbolType.OPENING_PARENTHESIS}${SymbolType.CLOSING_PARENTHESIS}`;
        }

        return {
            startIndex,
            endIndex,
            valueToInsert,
        }
    }

    const handleOperatorAfterOperator = (currentSymbol: string): IUpdatedInputValue => {
        const endIndex = mathOperations[lastSymbol].operatorType === OperatorType.POSTFIX ? lastSymbolIndex : lastSymbolIndex - 1;

        return {
            endIndex,
            startIndex: 0,
            valueToInsert: currentSymbol,
            sliceEnd: true,
        }
    }

    const handleMinusSymbol = (currentSymbol: string): IUpdatedInputValue => {
        let startIndex: number;

        if (inputValue === SymbolType.ZERO) {
            startIndex = 1;
        } else if (isInputSymbolIsMathOperator(lastSymbol, mathOperations)) {
            return handleOperatorAfterOperator(currentSymbol);
        } else {
            startIndex = 0;
        }

        return {
            startIndex,
            endIndex: lastSymbolIndex,
            valueToInsert: currentSymbol,
        };
    }

    const displayMathOperatorsHandler = <T extends HTMLElement>(e: MouseEvent<T>): IUpdatedInputValue => {
        const target = e.target as HTMLDivElement;
        const currentSymbol = target.innerText;

        if (lastSymbol === currentSymbol || lastSymbol === SymbolType.COMMA) {
            return {
                startIndex: 0,
                endIndex: lastSymbolIndex,
                valueToInsert: SymbolType.EMPTY,
            };
        }

        const { operands: currentSymbolOperands, isParenthesesNeed, operator } = getMathOperationByInnerText(currentSymbol, mathOperations);
        const isFirstSymbolAndSingleOperand = checkIsFirstSymbolAndSingleOperand(currentSymbolOperands, inputValue);

        if (isParenthesesNeed) {
            return handleParenthesesAfterOperand(isFirstSymbolAndSingleOperand, operator);
        }

        if (isFirstSymbolAndSingleOperand) {
            return {
                startIndex: 1,
                endIndex: lastSymbolIndex,
                valueToInsert: operator,
            };
        }

        if (currentSymbol === SymbolType.MINUS) {
            return handleMinusSymbol(operator);
        }

        if (isFinite(+lastSymbol)) {
            const shouldEmpty = mathOperations[operator].operatorType === OperatorType.PREFIX;
            return {
                startIndex: 0,
                endIndex: lastSymbolIndex,
                valueToInsert: shouldEmpty ? SymbolType.EMPTY : operator,
            };
        }

        if (lastSymbol === SymbolType.CLOSING_PARENTHESIS) {
            return {
                startIndex: 0,
                endIndex: currentSymbolOperands === 1 ? 0 : lastSymbolIndex,
                valueToInsert: currentSymbolOperands === 1 ? SymbolType.EMPTY : operator,
            };
        }

        if (lastSymbol === SymbolType.OPENING_PARENTHESIS) {
            return {
                startIndex: 0,
                endIndex: mathOperations[operator].operatorType === OperatorType.PREFIX ? lastSymbolIndex : 0,
                valueToInsert: mathOperations[operator].operatorType === OperatorType.PREFIX ? operator : SymbolType.EMPTY,
            };
        }

        if (isInputSymbolIsMathOperator(lastSymbol, mathOperations)) {
            return handleOperatorAfterOperator(operator);
        }
    };

    return {
        displayMathOperatorsHandler
    }
}