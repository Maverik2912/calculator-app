import {IOperatorDescription} from "./operator.interface";

/**
 * Representation of expression stacks containing numbers and operators.
 */
export interface IExpressionStacks {
    /**
     * Stack containing numbers in the expression.
     */
    numbersStack: string[];

    /**
     * Stack containing operator descriptions in the expression.
     */
    operatorsStack: IOperatorDescription[];
}