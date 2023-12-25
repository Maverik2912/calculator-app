import {createContext, FC, ReactNode, useContext, useState} from 'react';

import {IButtonsContext} from "../interfaces";
import {CalculatorContext} from "./CalculatorProvider";

interface IButtonsProviderProps {
    children?: ReactNode;
}

const ButtonsContext = createContext<IButtonsContext>(null);

const ButtonsProvider: FC<IButtonsProviderProps> = ({children}) => {
    const [parenthesesOffset, setParenthesesOffset] = useState<number>(0);
    const {inputValue} = useContext(CalculatorContext);

    const lastSymbolIndex = inputValue.length - 1 + parenthesesOffset;
    const lastSymbol = inputValue.at(lastSymbolIndex);

    return (
        <ButtonsContext.Provider value={{parenthesesOffset, setParenthesesOffset, lastSymbol, lastSymbolIndex}}>
            {children}
            </ButtonsContext.Provider>
    );
};

export {
    ButtonsProvider,
    ButtonsContext
}