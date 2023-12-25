/**
 * Interface representing a service for tokenize expression and validate tokens.
 */
export interface ITokensHandlerService {
    tokenizeExpression(expression: string): string[];
    validateTokens(tokens: string[]): void;
}