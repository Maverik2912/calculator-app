import {IMathOperation, IMathOperations} from "@common-interfaces";
import {OperationType} from "@common-enums";

export const filterMathOperationsByType = (mathOperations: IMathOperations, targetOperationType: OperationType): IMathOperation[] => {
    return Object.values(mathOperations).filter(({operationType}) => operationType === targetOperationType);
}