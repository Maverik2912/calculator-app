import {calculationsService} from "../calculations";
import {
    IExpressionStacks,
    IInputParser,
    IOperatorDescription,
} from "./interface";
import {BadRequestException} from "@errors";
import {InstanceName, MathOperations} from "../../enums";
import {SymbolType} from "./enum";
import {tokensHandlerService} from "../tokens-handler";
import {parenthesesHandlerService} from "../parentheses-handler";
import {mathOperations} from "../../config";
import {textMessages} from "@texts";
import {LoggerUtil} from "@modules/logger/utils";

/**
 * Implementation of the IInputParser interface.
 * @implements IInputParser
 */
class InputParserService implements IInputParser {
    /**
     * Parses the input expression and returns the parsed tokens.
     * @param expression - The input expression to be parsed.
     * @returns {string[]} The parsed tokens.
     */
    public parseInputOrThrow(expression: string): string[] {
        const {EMPTY_EXPRESSION, EXPRESSION_FORMATTED, INVOKE_PARSE_BY_PARENTHESES} = textMessages.modules.calculator.service.inputParser;
        LoggerUtil.getLogger().logInfo({message: textMessages.workStatus.START, instanceName: InstanceName.INPUT_PARSER_SERVICE_PARSE_INPUT});

        if (this.isExpressionEmpty(expression)) {
            const emptyExpressionResult = this.handleEmptyExpression();
            LoggerUtil.getLogger().logDebug({message: EMPTY_EXPRESSION, metadata: {result: emptyExpressionResult}, instanceName: InstanceName.INPUT_PARSER_SERVICE_PARSE_INPUT});
            return emptyExpressionResult;
        }

        const formattedExpression = this.getFormattedExpressionOrThrow(expression);
        LoggerUtil.getLogger().logDebug({message: EXPRESSION_FORMATTED, metadata: {formattedExpression}, instanceName: InstanceName.INPUT_PARSER_SERVICE_PARSE_INPUT});

        LoggerUtil.getLogger().logDebug({message: INVOKE_PARSE_BY_PARENTHESES, metadata: {formattedExpression}, instanceName: InstanceName.INPUT_PARSER_SERVICE_PARSE_INPUT});

        const parsedResult = parenthesesHandlerService.parseByParentheses(formattedExpression);
        LoggerUtil.getLogger().logInfo({message: textMessages.workStatus.FINISH, instanceName: InstanceName.INPUT_PARSER_SERVICE_PARSE_INPUT});
        return parsedResult;
    }

    /**
     * Parses and calculates the result of the expression.
     * @param expression - The parsed tokens of the expression.
     * @returns {string} The calculated result.
     * @throws {BadRequestException} Will throw an error if division by zero is encountered or if expression array contains undefined/null.
     */
    public parseAndCalculateExpression(expression: string[]): string {
        const {EXPRESSION_IS_NULL_OR_UNDEFINED, PARSED_SUCCESSFULLY} = textMessages.modules.calculator.service.inputParser;
        LoggerUtil.getLogger().logInfo({message: textMessages.workStatus.START, instanceName: InstanceName.INPUT_PARSER_SERVICE_PARSE_AND_CALC});

        if(expression[0] == null) {
            LoggerUtil.getLogger().logDebug({message: EXPRESSION_IS_NULL_OR_UNDEFINED, instanceName: InstanceName.INPUT_PARSER_SERVICE_PARSE_AND_CALC});
            throw new BadRequestException(textMessages.error.INVALID_EXPRESSION_TEXT);
        }

        if(expression.length === 1 && isFinite(+expression[0])) {
            const result = expression[0];
            LoggerUtil.getLogger().logDebug({message: PARSED_SUCCESSFULLY, metadata: {result}, instanceName: InstanceName.INPUT_PARSER_SERVICE_PARSE_AND_CALC});
            LoggerUtil.getLogger().logInfo({message: textMessages.workStatus.FINISH, instanceName: InstanceName.INPUT_PARSER_SERVICE_PARSE_AND_CALC});
            return result;
        }

        const { operatorsStack, numbersStack } = this.generateStacksFromExpression(expression);
        const sortedOperators = operatorsStack.sort((a: IOperatorDescription, b: IOperatorDescription) => b.priorityWeight - a.priorityWeight);

        sortedOperators.forEach((operator, index) => {
            this.updateNumbersStackWithSubResultOrThrow(operator, index, numbersStack);
        });

        LoggerUtil.getLogger().logDebug({message: PARSED_SUCCESSFULLY, metadata: {result: numbersStack[0]}});
        LoggerUtil.getLogger().logInfo({message: textMessages.workStatus.FINISH, instanceName: InstanceName.INPUT_PARSER_SERVICE_PARSE_AND_CALC});
        return numbersStack[0];
    }

    /**
     * Parse the first negative number in the expression and prepend a zero if necessary.
     * @private
     * @param expression - The input expression.
     * @returns {string[]} The expression with the first negative number parsed.
     */
    public parseFirstNegativeNumber(expression: string[]): string[] {
        if (expression[0] === SymbolType.MINUS) {
            expression.unshift(SymbolType.ZERO);
        }

        return expression;
    }

    /**
     * Generates stacks of operators and numbers from the parsed expression.
     * @param expression - The parsed tokens of the expression.
     * @returns {IExpressionStacks} Stacks of operators and numbers.
     */
    private generateStacksFromExpression(expression: string[]): IExpressionStacks {
        const numbersStack: string[] = [];
        const operatorsStack: IOperatorDescription[] = [];

        for (const char of expression) {
            if (calculationsService.isMathOperator(char)) {
                operatorsStack.push({ ...mathOperations[char], index: operatorsStack.length });
            } else {
                numbersStack.push(char);
            }
        }

        return { numbersStack, operatorsStack };
    }

    /**
     * Update the numbers stack with the result of the current operator or throw an error if dividing by zero.
     * @private
     * @param currentOperator - The current operator description.
     * @param index - The index of the current operator.
     * @param numbersStack - The stack of numbers.
     * @throws {BadRequestException} Will throw an error if dividing by zero.
     */
    private updateNumbersStackWithSubResultOrThrow(currentOperator: IOperatorDescription, index: number, numbersStack: string[]): void {
        const { operation, operands: countOfOperands, index: operatorIndex, operator: operatorSymbol } = currentOperator;
        let startIndex = operatorIndex - index;

        if (startIndex < 0) {
            startIndex = 0;
        }

        const operands = numbersStack.slice(startIndex, startIndex + countOfOperands + 1);

        if (this.isDividedByZero(operatorSymbol, operands)) {
            throw new BadRequestException(textMessages.error.DIVIDED_BY_NULL);
        }

        const subResult = calculationsService.calculateAndValidateResult(operation, operands);
        numbersStack.splice(startIndex, countOfOperands, subResult.toString());
    }

    /**
     * Check if dividing by zero.
     * @private
     * @param operatorSymbol - The symbol of the operator.
     * @param operands - The operands for the operation.
     * @returns {boolean} `true` if dividing by zero, otherwise `false`.
     */
    private isDividedByZero(operatorSymbol: string, operands: string[]): boolean {
        return operatorSymbol === MathOperations.DIVIDE && operands[1] === SymbolType.ZERO;
    }

    /**
     * Retrieves the formatted expression by removing spaces, replacing commas with dots, and tokenizing the expression.
     * This function may throw an error if the input expression contains invalid tokens.
     *
     * @private
     * @param expression - The input expression.
     * @returns {string[]} The formatted expression as an array of tokens.
     * @throws {Error} Throws an error if the input expression contains invalid tokens.
     */
    private getFormattedExpressionOrThrow(expression: string): string[] {
        const noSpaceValue = this.removeSpaces(expression);
        const replacedCommaWithDotValue = this.replaceCommaWithDot(noSpaceValue);
        const tokenizeExpression = tokensHandlerService.tokenizeExpression(replacedCommaWithDotValue);
        tokensHandlerService.validateTokens(tokenizeExpression);
        return this.parseFirstNegativeNumber(tokenizeExpression);
    }

    /**
     * Remove spaces from the expression.
     * @private
     * @param expression - The input expression.
     * @returns {string} The expression with spaces removed.
     */
    private removeSpaces(expression: string): string {
        return expression.replace(/\s/g, SymbolType.EMPTY);
    }

    /**
     * Replace commas with dots in the expression.
     * @private
     * @param expression - The input expression.
     * @returns {string} The expression with commas replaced by dots.
     */
    private replaceCommaWithDot(expression: string): string {
        return expression.replaceAll(SymbolType.COMMA, SymbolType.DOT);
    }

    /**
     * Method checks whether expression is empty.
     * @private
     * @param expression - The input expression.
     * @returns {boolean} Returns true if expression is empty.
     */
    private isExpressionEmpty(expression: string): boolean {
        return expression === SymbolType.EMPTY;
    }

    /**
     * Method for handling empty expression.
     * @private
     * @returns {string[]} Return array of strings with single element which is 0.
     */
    private handleEmptyExpression(): string[] {
            return [SymbolType.ZERO];
    }
}

export const inputParserService = new InputParserService();
