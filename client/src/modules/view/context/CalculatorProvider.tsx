import {createContext, FC, ReactNode, useEffect, useState} from 'react';

import {ICalculatorHistoryRecord, IMathOperations} from "@common-interfaces";
import {clientModulesRegistry} from "@modules";
import {ICalculatorContext} from "../interfaces";
import {SymbolType} from "../enums";

interface ICalculatorProviderProps {
    children?: ReactNode;
}

const CalculatorContext = createContext<ICalculatorContext>(null);
const CalculatorProvider: FC<ICalculatorProviderProps> = ({children}) => {
    const [mathOperations, setMathOperations] = useState<IMathOperations>(null);
    const [inputValue, setInputValue] = useState<string>(SymbolType.ZERO);
    const [history, setHistory] = useState<ICalculatorHistoryRecord[]>(null);

    useEffect(() => {
        const calculatorService = clientModulesRegistry.apiManager.services.calculator;
        calculatorService.getMathOperationsDetails()
            .then(({data: {result}}) => setMathOperations(result));
    }, []);

    return (
        <CalculatorContext.Provider value={{mathOperations, inputValue, setInputValue, history, setHistory}}>
            {children}
        </CalculatorContext.Provider>
    );
};

export {
    CalculatorProvider,
    CalculatorContext
};