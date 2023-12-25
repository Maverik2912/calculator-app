import {Dispatch, SetStateAction} from "react";

export interface IButtonsContext {
    parenthesesOffset: number;
    setParenthesesOffset:  Dispatch<SetStateAction<number>>
    lastSymbolIndex: number;
    lastSymbol: string;
}