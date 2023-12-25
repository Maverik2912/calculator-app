import {Dispatch, SetStateAction, useContext} from "react";
import {AxiosError, AxiosResponse} from 'axios';

import {CalculatorContext} from "../context";
import {SymbolType} from "../enums";
import {clientModulesRegistry} from "@modules";
import {historyConfig} from "../configs";

export const useExpressionCalculationHandler = () => {
    const {inputValue, setInputValue, setHistory, history} = useContext(CalculatorContext);

    const calculateExpressionAndSaveToHistory = (setResult: Dispatch<SetStateAction<string>>): void => {
        const {calculator: {calculateExpression}} = clientModulesRegistry.apiManager.services;

        calculateExpression({expression: inputValue})
            .then(({data: {result}}) => {
                setResult(result);
                setInputValue(SymbolType.ZERO);

                if (history) {
                    history.forEach(({expression}, index) => {
                        expression === inputValue && history.splice(index, 1);
                    });
                    setHistory([{expression: inputValue, result}, ...history.slice(0, Number(historyConfig.limit) - 1)]);
                }
            }).catch((e) => {
            const err = e as AxiosError;
            const axiosResponse = err.response as AxiosResponse;
            setResult(axiosResponse.data.result);
            setInputValue(SymbolType.ZERO);
        })
    }

    return {
        calculateExpressionAndSaveToHistory,
    }
}
