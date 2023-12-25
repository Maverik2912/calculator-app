import {IMathOperation} from "../../../interfaces";

/**
 * Interface representing a calculations service.
 */
export interface ICalculationsService {
    calculateAndValidateResult(operation: IMathOperation['operation'], operands: string[]): number;
    isMathOperator(char: string): boolean;
    getAvailableOperators(): string[];
}