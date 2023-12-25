import {OperatorType, OperationType} from "@common-enums";

/**
 * Interface representing a collection of mathematical operations.
 */
export interface IMathOperations {
    /**
     * Key-value pairs where the key is a string identifier and the value is an IMathOperation object.
     */
    [key: string]: IMathOperation;
}

/**
 * Interface representing a mathematical operation.
 */
export interface IMathOperation {
    /**
     * The string representation of the mathematical operator.
     */
    operator: string;

    /**
     * Text content to be displayed in the innerText of a specific element.
     */
    outputText: string;

    /**
     * The type of the mathematical operator (e.g., postfix, prefix).
     */
    operatorType: OperatorType;

    /**
     * A function that performs the mathematical operation on two numbers.
     * @param num1 The first operand.
     * @param num2 The second operand.
     * @returns {number} The result of the operation.
     */
    operation: (num1: number, num2?: number) => number;

    /**
     * The priority weight of the operation (higher values indicate higher priority).
     */
    priorityWeight: number;

    /**
     * The number of operands the operation takes.
     */
    operands: number;

    /**
     * Indicates whether parentheses are needed for this operation in an expression.
     */
    isParenthesesNeed: boolean;

    /**
     * Indicates type of operation: simple, advanced or engineering.
     */
    operationType: OperationType;
}