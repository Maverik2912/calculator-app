/**
 * Interface representing a service for handling expression enclosed in parentheses.
 */
export interface IParenthesesHandlerService {
     parseByParentheses(
        expression: string[],
        nestedParenthesesLevel: number,
        startIndex: number,
        endIndex: number,
        openParenthesesCount: number,
    ): string[]
}