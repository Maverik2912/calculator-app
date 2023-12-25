import {Dispatch, KeyboardEvent, SetStateAction, useContext} from "react";

import {KeyType, SymbolType} from "../enums";
import {CalculatorContext} from "../context";
import {IMathOperations} from "@common-interfaces";
import {specialKeys} from "../constants";
import {useExpressionCalculationHandler} from "./useExpressionCalculationHandler";

const isValidKey = (key: string, mathOperations: IMathOperations): boolean => {
    const availableOperators = Object.keys(mathOperations);
    const isAvailableSymbol = /[\d(),.]/.test(key);
    return availableOperators.includes(key) || isAvailableSymbol;
}

const isSpecialKey = (e: KeyboardEvent<HTMLInputElement>): boolean => {
    return e.ctrlKey || e.altKey || e.metaKey || specialKeys.includes(e.key as KeyType);
}

export const useInputEventHandlers = () => {
    const {inputValue, setInputValue, mathOperations} = useContext(CalculatorContext);
    const {calculateExpressionAndSaveToHistory} = useExpressionCalculationHandler();

    const focusHandler = (): void => {
        if(inputValue === SymbolType.ZERO) {
            setInputValue(SymbolType.EMPTY);
        }
    }

    const blurHandler = (): void => {
        if(inputValue === SymbolType.EMPTY) {
            setInputValue(SymbolType.ZERO);
        }
    }

    const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>, setResult: Dispatch<SetStateAction<string>>): void => {
        if (e.key === KeyType.ENTER) {
            calculateExpressionAndSaveToHistory(setResult);
            return;
        }

        if (!isValidKey(e.key, mathOperations) && !isSpecialKey(e)) {
            e.preventDefault();
            return;
        }

        if (inputValue === SymbolType.ZERO && isFinite(+e.key)) {
            setInputValue(inputValue.slice(1));
        }
    }

    return {
        focusHandler,
        blurHandler,
        keyDownHandler,
    }
}