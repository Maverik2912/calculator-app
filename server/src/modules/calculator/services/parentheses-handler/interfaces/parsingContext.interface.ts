/**
 * Represents the context during expression parsing.
 */
export interface IParsingContext {
    /**
     * The index indicating the start position during expression parsing.
     */
    startIndex: number;

    /**
     * The index indicating the end position during expression parsing.
     */
    endIndex: number;

    /**
     * Count of open parentheses encountered during expression parsing.
     */
    openParenthesesCount: number;

    /**
     * Level of nested parentheses encountered during expression parsing.
     */
    nestedParenthesesLevel: number;
}
