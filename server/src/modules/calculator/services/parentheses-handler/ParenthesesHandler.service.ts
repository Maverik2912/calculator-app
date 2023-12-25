import {SymbolType} from "../input-parser/enum";
import {BadRequestException} from "@errors";
import {inputParserService} from "../input-parser";
import {ICloseParenthesisParams, IParenthesesHandlerService, IParsingContext} from "./interfaces";
import {textMessages} from "@texts";
import {InstanceName} from "../../enums";
import {LoggerUtil} from "@modules/logger/utils";

class ParenthesesHandlerService implements IParenthesesHandlerService{
    /**
     * Index indicating the start position during expression parsing.
     * @private
     */
    private startIndex: number;

    /**
     * Index indicating the end position during expression parsing.
     * @private
     */
    private endIndex: number;

    /**
     * Count of open parentheses encountered during expression parsing.
     * @private
     */
    private openParenthesesCount: number;

    /**
     * Level of nested parentheses encountered during expression parsing.
     * @private
     */
    private nestedParenthesesLevel: number;

    /**
     * Parse an expression by parentheses and return the result stack.
     * @param expression - The expression to parse.
     * @param nestedParenthesesLevel - The current level of nested parentheses.
     * @param startIndex - The starting index of the expression.
     * @param endIndex - The ending index of the expression.
     * @param openParenthesesCount - The count of open parentheses.
     * @returns {string[]} The result stack of the parsed expression.
     */
    public parseByParentheses(
        expression: string[],
        nestedParenthesesLevel = 0,
        startIndex = -1,
        endIndex = -1,
        openParenthesesCount = 0,
    ): string[] {
        let subExpressionStack: string[] = [];
        let mainStack: string[] = [];

        this.initializeParsingContext({ startIndex, endIndex, nestedParenthesesLevel, openParenthesesCount });

        const {FINISH, START} = textMessages.workStatus;
        LoggerUtil.getLogger().logInfo({message: START, instanceName: InstanceName.PARENTHESES_HANDLER_SERVICE_PARSE_BY_PARENTHESES, metadata: {expression, nestedParenthesesLevel, startIndex, endIndex, openParenthesesCount}});

        for (let i = 0; i < expression.length; i++) {
            const element = expression[i];

            let maxLevelOfNested = Math.max(this.nestedParenthesesLevel, this.openParenthesesCount);

            if (element === SymbolType.OPENING_PARENTHESIS) {
                this.handleOpenParenthesis(i);
            } else if (element === SymbolType.CLOSING_PARENTHESIS) {
                this.handleCloseParenthesis(
                    {
                        endIndex: i,
                        maxLevelOfNested,
                        elements: expression,
                        subExpressionStack,
                        mainStack,
                    }
                );
            } else {
                this.handleNonParenthesisElement(element, mainStack);
            }
        }

        this.validateParenthesesCount();

        LoggerUtil.getLogger().logInfo({message: FINISH, metadata: {result: mainStack}, instanceName: InstanceName.PARENTHESES_HANDLER_SERVICE_PARSE_BY_PARENTHESES});
        return mainStack;
    }

    /**
     * Initialize the parsing context.
     * @private
     * @param parsingContext - The parsing context parameters.
     */
    private initializeParsingContext(parsingContext: IParsingContext): void {
        Object.entries(parsingContext).forEach(([key, value]) => {
            const k = key as keyof this;
            this[k] = value;
        });
    }

    /**
     * Handle an open parenthesis during expression parsing.
     * @private
     * @param index - The index of the open parenthesis.
     */
    private handleOpenParenthesis(index: number): void {
        if (!this.openParenthesesCount) {
            this.startIndex = index;
        }
        this.openParenthesesCount++;
        this.nestedParenthesesLevel = this.openParenthesesCount;
    }

    /**
     * Handle a close parenthesis during expression parsing.
     * @private
     * @param parsingContext - The context parameters for closing parenthesis handling.
     * @throws {BadRequestException} Will throw an error if there are unmatched parentheses.
     */
    private handleCloseParenthesis(parsingContext: ICloseParenthesisParams): void {
        let { endIndex, maxLevelOfNested, elements, subExpressionStack, mainStack } = parsingContext;

        this.openParenthesesCount--;

        if (this.openParenthesesCount < 0) {
            throw new BadRequestException(textMessages.error.INVALID_EXPRESSION_TEXT);
        }

        if (!this.openParenthesesCount) {
            this.endIndex = endIndex;
            subExpressionStack = inputParserService.parseFirstNegativeNumber(elements.slice(this.startIndex + 1, this.endIndex));

            while (maxLevelOfNested > 1) {
                maxLevelOfNested--;
                subExpressionStack = this.parseByParentheses(subExpressionStack, maxLevelOfNested);
            }

            const subExpressionResult = inputParserService.parseAndCalculateExpression(subExpressionStack);
            mainStack.push(subExpressionResult);
        }
    }

    /**
     * Handle a non-parenthesis element during expression parsing.
     * @private
     * @param element - The non-parenthesis element.
     * @param mainStack - The main stack of the expression.
     */
    private handleNonParenthesisElement(element: string, mainStack: string[]): void {
        if (!this.openParenthesesCount) {
            mainStack.push(element);
        }
    }

    /**
     * Validate the count of parentheses in the expression.
     * @private
     * @throws {BadRequestException} Will throw an error if there are unmatched parentheses.
     */
    private validateParenthesesCount(): void {
        if (this.openParenthesesCount > 0) {
            throw new BadRequestException(textMessages.error.INVALID_EXPRESSION_TEXT);
        }
    }
}

export const parenthesesHandlerService = new ParenthesesHandlerService();
