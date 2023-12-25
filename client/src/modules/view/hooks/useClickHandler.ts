import { MouseEvent, useContext } from "react";

import {ButtonsContext, CalculatorContext} from "../context";
import {IUpdatedInputValue} from "../interfaces";

function useClickHandler<T extends HTMLElement = HTMLElement>(
    handler: (e: MouseEvent<T>) => IUpdatedInputValue
): (e: MouseEvent<T>) => void {
    const { inputValue, setInputValue } = useContext(CalculatorContext);
    const { parenthesesOffset } = useContext(ButtonsContext);

    return (e): void => {
        try {
            const { startIndex, endIndex, valueToInsert, sliceEnd, reset, deleteSymbol } = handler(e);
            let updatedInputValue: string;

            if (reset) {
                updatedInputValue = valueToInsert;
            } else if (deleteSymbol) {
                updatedInputValue = `${inputValue.slice(0, -1)}${valueToInsert}`;
            } else if (!parenthesesOffset) {
                updatedInputValue = `${inputValue.slice(startIndex, endIndex + 1)}${valueToInsert}`;
            } else {
                const endPosition = !sliceEnd ? endIndex + 1 : endIndex + 2;
                updatedInputValue = `${inputValue.slice(startIndex, endIndex + 1)}${valueToInsert}${inputValue.slice(endPosition)}`
            }

            setInputValue(updatedInputValue);
        } catch(e) {
            console.error(e);
        }
    }
}

export { useClickHandler };
