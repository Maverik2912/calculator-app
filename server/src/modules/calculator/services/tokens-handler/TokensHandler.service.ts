import {calculationsService} from "../calculations";
import {SymbolType} from "../input-parser/enum";
import {BadRequestException} from "@errors";
import {ITokensHandlerService} from "./interfaces";
import {textMessages} from "@texts";
import {InstanceName} from "../../enums";
import {LoggerUtil} from "@modules/logger/utils";

class TokensHandlerService implements ITokensHandlerService{
    /**
     * Tokenize the expression by mathematical operators, parentheses, and other symbols.
     * @param expression - The expression to tokenize.
     * @returns {string[]} The tokenized expression as an array of strings.
     */
    public tokenizeExpression(expression: string): string[] {
        const {EXPRESSION_TOKENIZED} = textMessages.modules.calculator.service.tokensHandler;
        LoggerUtil.getLogger().logInfo({message: textMessages.workStatus.START, instanceName: InstanceName.TOKENS_HANDLER_SERVICE_TOKENIZE});

        const pattern = this.createExpressionPattern();
        const tokenizedExpression = expression.split(pattern).filter(token => token.trim() !== SymbolType.EMPTY);
        LoggerUtil.getLogger().logDebug({message: EXPRESSION_TOKENIZED, metadata: {result: tokenizedExpression}, instanceName: InstanceName.TOKENS_HANDLER_SERVICE_TOKENIZE});
        LoggerUtil.getLogger().logInfo({message: textMessages.workStatus.FINISH, instanceName: InstanceName.TOKENS_HANDLER_SERVICE_TOKENIZE});
        return tokenizedExpression;
    }

    /**
     * Validates an array of tokens to ensure that each token is a valid element in a mathematical expression.
     * If an invalid token is found, an error is thrown with a specified error message.
     * @param tokens - An array of tokens to be validated.
     * @throws {BadRequestException} Throws an error with a specified message if an invalid token is encountered.
     */
    public validateTokens(tokens: string[]): void {
        tokens.forEach((token) => {
            if (!this.isValidToken(token, this.createExpressionPattern())) {
                throw new BadRequestException(textMessages.error.INVALID_EXPRESSION_TEXT);
            }
        });
    }

    /**
     * Creates a regular expression pattern for tokenizing mathematical expressions.
     * The pattern includes operators and parentheses.
     * @returns {RegExp} The regular expression pattern.
     */
    private createExpressionPattern(): RegExp {
        const operatorsPattern = this.createOperatorsString();
        return new RegExp(`(${operatorsPattern}|\\(|\\))`);
    }

    /**
     * Create a regular expression pattern for matching mathematical operators.
     * Map each operator, adding a backslash if the length is 1 (single character), indicating that it should be treated as a special character in the regex pattern.
     * @private
     * @returns {string} The regular expression pattern for mathematical operators.
     */
    private createOperatorsString(): string {
        return calculationsService.getAvailableOperators().map((operator) => operator.length > 1 ? operator : `\\${operator}`).join(SymbolType.VERTICAL_BAR);
    }

    /**
     * Checks if a given token is a valid element in a specified context, represented by the provided regular expression pattern.
     * It validates that the token is either a number or matches the predefined expression pattern.
     *
     * @param token - The token to be validated.
     * @param pattern - The regular expression pattern representing the valid context for the token.
     * @returns {boolean} True if the token is valid within the specified context, otherwise false.
     */
    private isValidToken(token: string, pattern: RegExp): boolean {
        return /^(\d+|\d+\.\d+)$/.test(token) || pattern.test(token);
    }
}

export const tokensHandlerService = new TokensHandlerService();