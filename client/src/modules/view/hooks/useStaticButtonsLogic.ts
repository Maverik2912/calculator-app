import {MouseEvent, useContext} from "react";

import {ButtonsContext, CalculatorContext} from "../context";
import {IUpdatedInputValue} from "../interfaces";
import {SymbolType} from "../enums";

export const useStaticButtonsLogic = () => {
    const {lastSymbolIndex, lastSymbol} = useContext(ButtonsContext);
    const {inputValue} = useContext(CalculatorContext);

    const displayDigitHandler = (currentSymbol: string): IUpdatedInputValue => {
        let startIndex: number;
        let valueToInsert: string;

        if (lastSymbol === SymbolType.CLOSING_PARENTHESIS) {
            startIndex = 0;
            valueToInsert = SymbolType.EMPTY;

        } else {
            startIndex = inputValue === SymbolType.ZERO ? 1 : 0;
            valueToInsert = currentSymbol;
        }

        return {
            startIndex,
            valueToInsert,
            endIndex: lastSymbolIndex,
        }
    }

    const displayCommaHandler = (currentSymbol: string): IUpdatedInputValue => {
        return {
            startIndex: 0,
            endIndex: lastSymbolIndex,
            valueToInsert: !isFinite(+lastSymbol) ? SymbolType.EMPTY : currentSymbol,
        }
    }

    const staticButtonsClickHandler = <T extends HTMLElement>(e: MouseEvent<T>): IUpdatedInputValue => {
        const target = e.target as HTMLDivElement;
        const currentSymbol = target.innerText;

        if (isFinite(+currentSymbol)) {
            return displayDigitHandler(currentSymbol);
        }

        if (currentSymbol === SymbolType.COMMA) {
            return displayCommaHandler(currentSymbol);
        }
    }

    return {
        staticButtonsClickHandler,
    }
}