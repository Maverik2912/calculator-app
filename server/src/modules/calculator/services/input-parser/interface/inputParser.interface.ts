/**
 * Interface for parsing and calculating mathematical expressions.
 */
export interface IInputParser {
    parseInputOrThrow(expression: string): string[];
    parseAndCalculateExpression(expression: string[]): string;
    parseFirstNegativeNumber(expression: string[]): string[];
}