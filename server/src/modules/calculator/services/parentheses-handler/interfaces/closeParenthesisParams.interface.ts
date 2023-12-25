/**
 * Parameters for handling a closing parenthesis during expression parsing.
 */
export interface ICloseParenthesisParams {
    /**
     * The index of the closing parenthesis.
     */
    endIndex: number;

    /**
     * The maximum level of nested parentheses encountered during parsing.
     */
    maxLevelOfNested: number;

    /**
     * The array of elements representing the entire expression.
     */
    elements: string[];

    /**
     * The stack representing the sub-expression enclosed by parentheses.
     */
    subExpressionStack: string[];

    /**
     * The main stack representing the entire expression.
     */
    mainStack: string[];
}