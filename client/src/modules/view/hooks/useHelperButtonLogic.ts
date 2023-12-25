import {Dispatch, MouseEvent, SetStateAction, useContext} from "react";

import {ButtonsContext, CalculatorContext} from "../context";
import {IUpdatedInputValue} from "../interfaces";
import {SymbolType} from "../enums";
import {isInputSymbolIsMathOperator} from "../utils";

const isOpeningParenthesis = (symbol: string): boolean => {
    return symbol === SymbolType.OPENING_PARENTHESIS;
}

const isClosedParenthesis = (symbol: string): boolean => {
    return symbol === SymbolType.CLOSING_PARENTHESIS;
}

const defaultValueAndStartIndex = {
    startIndex: 0,
    valueToInsert: SymbolType.EMPTY,
};

export const useHelperButtonLogic = () => {
    const {setParenthesesOffset, lastSymbolIndex, lastSymbol} = useContext(ButtonsContext);
    const {inputValue, mathOperations} = useContext(CalculatorContext);

    const getValueToInsertAndStartIndex = (currentSymbol: string): Pick<IUpdatedInputValue, 'startIndex' | 'valueToInsert'> => {
        const shouldReturnDefault =
            lastSymbol === SymbolType.COMMA ||
            (isOpeningParenthesis(currentSymbol) && (isFinite(+lastSymbol) || isClosedParenthesis(lastSymbol))) ||
            (isClosedParenthesis(currentSymbol) && isInputSymbolIsMathOperator(lastSymbol, mathOperations));

        if (isOpeningParenthesis(currentSymbol) && inputValue === SymbolType.ZERO) {
            return {
                startIndex: 1,
                valueToInsert: currentSymbol,
            };
        }

        return shouldReturnDefault
            ? defaultValueAndStartIndex
            : {startIndex: 0, valueToInsert: currentSymbol}
    }

    const displayParenthesesHandler = (currentSymbol: string): IUpdatedInputValue => {
        const {startIndex, valueToInsert} = getValueToInsertAndStartIndex(currentSymbol);

        return {
            startIndex,
            valueToInsert,
            endIndex: lastSymbolIndex,
        }
    }

    const resetHandler = (setResult: Dispatch<SetStateAction<string>>): IUpdatedInputValue => {
        setParenthesesOffset(0);
        setResult(SymbolType.ZERO);
        return {
            valueToInsert: SymbolType.ZERO,
            reset: true,
        }
    }

    const deleteSymbolHandler = (): IUpdatedInputValue => {
        const inputLength = inputValue.length;
        const firstSymbol = inputValue.charAt(0);
        let valueToInsert: string;

        if ((inputLength === 2 && firstSymbol === SymbolType.MINUS) || (inputLength === 1)) {
            valueToInsert = SymbolType.ZERO;
        } else {
            valueToInsert = SymbolType.EMPTY;
        }

        return {
            valueToInsert,
            deleteSymbol: true,
        }
    }

    const helperButtonsClickHandler = <T extends HTMLElement>(e: MouseEvent<T>, setResult: Dispatch<SetStateAction<string>>): IUpdatedInputValue => {
        const target = e.target as HTMLDivElement;
        const currentSymbol = target.innerText;

        if (isClosedParenthesis(currentSymbol) || isOpeningParenthesis(currentSymbol)) {
            return displayParenthesesHandler(currentSymbol);
        }

        if (currentSymbol === SymbolType.C) {
            return resetHandler(setResult);
        }

        if (currentSymbol === SymbolType.CE) {
            return deleteSymbolHandler();
        }
    }

    return {
        helperButtonsClickHandler,
    }
}
