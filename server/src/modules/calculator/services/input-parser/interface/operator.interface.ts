import {IMathOperation} from "../../../interfaces";


/**
 * Interface representing the description of a mathematical operator.
 * @extends IMathOperation
 */
export interface IOperatorDescription extends IMathOperation {
    /**
     * The index of the operator in the expression.
     */
    index: number;
}