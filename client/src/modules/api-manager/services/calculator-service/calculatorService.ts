import {apiService} from "../api-service";
import {IMathOperations} from "@common-interfaces";
import {ICalculatorServiceResponse, IExpressionData} from "../../interfaces";
import {urls} from "../../constants";

export const calculatorService = {
    getMathOperationsDetails: () => apiService.get<ICalculatorServiceResponse<IMathOperations>>(urls.mathOperationsList),
    calculateExpression: (expression: IExpressionData) => apiService.post<ICalculatorServiceResponse<string>>(urls.calculateExpression, expression),
}