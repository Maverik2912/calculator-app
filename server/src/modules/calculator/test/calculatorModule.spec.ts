import {expect, use} from "chai";
import sinonChai from 'sinon-chai';
import {describe} from "mocha";
import supertest from "supertest";
import sinon from 'sinon';

import {
    calculationsService,
    formatterService,
    inputParserService,
    parenthesesHandlerService,
    tokensHandlerService
} from "../services";
import {add, factorial} from "@utils";
import {app} from "@app";
import {BadRequestException} from "@errors";
import {textMessages} from "@texts";

use(sinonChai);

describe('Integration Tests', () => {
    const {INVALID_EXPRESSION_TEXT, NUMBER_IS_TOO_BIG, DIVIDED_BY_NULL} = textMessages.error;
    afterEach(() => sinon.restore());

    describe('InputParserService', () => {
        it('interacts with TokensHandlerService and ParenthesesHandlerService with valid expression', () => {
            const expression = '2+3*(5-1)';
            const tokens = ['2', '+', '3', '*', '(', '5', '-', '1', ')'];
            const parsedTokens = ['2', '+', '3', '*', '4'];

            const tokenizeStub = sinon.stub(tokensHandlerService, 'tokenizeExpression');
            const parseStub = sinon.stub(parenthesesHandlerService, 'parseByParentheses');

            tokenizeStub.onCall(0).returns(tokens);
            parseStub.onCall(0).returns(parsedTokens);

            const parsedValue = inputParserService.parseInputOrThrow(expression);

            expect(tokenizeStub).calledOnceWithExactly(expression);
            expect(parseStub).calledOnceWithExactly(tokens);
            expect(parsedTokens).to.deep.equal(parsedValue);
        });

        it('interacts with TokensHandlerService and ParenthesesHandlerService with unclosed parenthesis', () => {
            const expression = '2+3*(5-1';
            const tokens = ['2', '+', '3', '*', '(', '5', '-', '1'];

            const tokenizeStub = sinon.stub(tokensHandlerService, 'tokenizeExpression');
            const parseStub = sinon.stub(parenthesesHandlerService, 'parseByParentheses');

            tokenizeStub.onCall(0).returns(tokens);
            parseStub.onCall(0).throws(new BadRequestException(INVALID_EXPRESSION_TEXT));

            expect(() => inputParserService.parseInputOrThrow(expression)).throw(BadRequestException, INVALID_EXPRESSION_TEXT);
            expect(tokenizeStub).calledOnceWith(expression);
            expect(parseStub).calledOnceWith(tokens);
        });

        it('interacts with TokensHandlerService with invalid expression', () => {
            const tokenizeStub = sinon.stub(tokensHandlerService, 'tokenizeExpression');
            const validateStub = sinon.stub(tokensHandlerService, 'validateTokens');

            tokenizeStub.onCall(0).returns(['2', '+', 'a']);
            validateStub.onCall(0).throws(new BadRequestException(INVALID_EXPRESSION_TEXT));

            expect(() => inputParserService.parseInputOrThrow('2+a')).throw(BadRequestException, INVALID_EXPRESSION_TEXT);
            expect(tokenizeStub).calledOnceWithExactly('2+a');
            expect(validateStub).calledOnceWithExactly(['2', '+', 'a']);
        })

        it('interacts with TokensHandlerService and ParenthesesHandlerService with empty input', () => {
            const tokenizeExpressionStub = sinon.stub(tokensHandlerService, 'tokenizeExpression');
            const parseByParenthesesStub = sinon.stub(parenthesesHandlerService, 'parseByParentheses');

            expect(inputParserService.parseInputOrThrow('')).deep.eq(['0']);

            sinon.assert.notCalled(tokenizeExpressionStub);
            sinon.assert.notCalled(parseByParenthesesStub);
        });

        it('interacts with TokensHandlerService with invalid operator', () => {
            const validateTokensStub = sinon.stub(tokensHandlerService, 'validateTokens');

            validateTokensStub.onCall(0).throws(new BadRequestException(INVALID_EXPRESSION_TEXT));

            expect(() => inputParserService.parseInputOrThrow('2$3')).throw(BadRequestException, INVALID_EXPRESSION_TEXT);
            expect(validateTokensStub).calledOnceWithExactly(['2$3']);
        });

        it('interacts with TokensHandlerService and ParenthesesHandlerService with () input value', () => {
            it('interacts with TokensHandlerService and ParenthesesHandlerService with () input value', () => {
                const tokenizeStub = sinon.stub(tokensHandlerService, 'tokenizeExpression');
                const parseStub = sinon.stub(parenthesesHandlerService, 'parseByParentheses');

                tokenizeStub.onCall(0).returns(['(', ')']);
                parseStub.onCall(0).throws(new BadRequestException(INVALID_EXPRESSION_TEXT));
                expect(() => inputParserService.parseInputOrThrow('()')).throw(BadRequestException, INVALID_EXPRESSION_TEXT);

                expect(tokenizeStub).calledOnceWithExactly('()');
                expect(parseStub).calledOnceWithExactly(['(', ')']);
            });
        });

        it('interacts with CalculationsService with valid expression', () => {
            const calculateStub = sinon.stub(calculationsService, 'calculateAndValidateResult');
            const isMathOperatorStub = sinon.stub(calculationsService, 'isMathOperator');

            calculateStub.onCall(0).returns(5);
            isMathOperatorStub.onCall(0).returns(false).onCall(1).returns(true).onCall(2).returns(false);

            expect(inputParserService.parseAndCalculateExpression(['2', '+', '3'])).deep.eq('5');
            expect(isMathOperatorStub).calledThrice;
            expect(calculateStub).calledOnceWithExactly(add, ['2', '3']);
        });

        it('interacts with CalculationsService with complex expression', () => {
            const calculateStub = sinon.stub(calculationsService, 'calculateAndValidateResult');
            const isMathOperatorStub = sinon.stub(calculationsService, 'isMathOperator');

            calculateStub.onCall(0).returns(4).onCall(1).returns(6);
            isMathOperatorStub.onCall(0).returns(false).onCall(1).returns(true).onCall(2).returns(false).onCall(3).returns(true).onCall(4).returns(false);

            expect(inputParserService.parseAndCalculateExpression(['2', '+', '2', '*', '2'])).deep.eq('6');
            expect(isMathOperatorStub).callCount(5);
            expect(calculateStub).calledTwice;
        });

        it('interacts with CalculationsService with missing operand', () => {
            const calculateStub = sinon.stub(calculationsService, 'calculateAndValidateResult');
            const isMathOperatorStub = sinon.stub(calculationsService, 'isMathOperator');

            calculateStub.onCall(0).throws(new BadRequestException(INVALID_EXPRESSION_TEXT));
            isMathOperatorStub.onCall(0).returns(false).onCall(1).returns(true);

            expect(() => inputParserService.parseAndCalculateExpression(['2', '+'])).throw(BadRequestException, INVALID_EXPRESSION_TEXT);
            expect(isMathOperatorStub).calledTwice;
            expect(calculateStub).calledOnceWithExactly(add, ['2']);
        });

        it('interacts with CalculationsService with too big number in result', () => {
            const calculateStub = sinon.stub(calculationsService, 'calculateAndValidateResult');
            const isMathOperatorStub = sinon.stub(calculationsService, 'isMathOperator');

            calculateStub.onCall(0).throws(new BadRequestException(NUMBER_IS_TOO_BIG));
            isMathOperatorStub.onCall(0).returns(false).onCall(1).returns(true);

            expect(() => inputParserService.parseAndCalculateExpression(['1000', '!'])).throw(BadRequestException, NUMBER_IS_TOO_BIG);
            expect(isMathOperatorStub).calledTwice;
            expect(calculateStub).calledOnceWithExactly(factorial, ['1000']);
        });

        it('interacts with CalculationsService with division by zero', () => {
            const calculateStub = sinon.stub(calculationsService, 'calculateAndValidateResult');
            const isMathOperatorStub = sinon.stub(calculationsService, 'isMathOperator');

            isMathOperatorStub.onCall(0).returns(false).onCall(1).returns(true).onCall(2).returns(false);

            expect(() => inputParserService.parseAndCalculateExpression(['2', '/', '0'])).throw(BadRequestException, DIVIDED_BY_NULL);
            expect(isMathOperatorStub).calledThrice;
            sinon.assert.notCalled(calculateStub);
        })
    });

    describe('ExpressionController', () => {
        it('interacts with InputParserService and FormatterService', async () => {
            const formatAndRoundNumberReturns = '1 000 000';

            const parseInputStub = sinon.stub(inputParserService, 'parseInputOrThrow');
            const parseAndCalculateStub = sinon.stub(inputParserService, 'parseAndCalculateExpression');
            const parseAndFormatStub = sinon.stub(formatterService, 'formatAndRoundNumber');

            parseInputStub.onCall(0).returns(['1000', '*', '1000']);
            parseAndCalculateStub.onCall(0).returns('1000000');
            parseAndFormatStub.onCall(0).returns(formatAndRoundNumberReturns);

            const response = await supertest(app).post('/expression').send({ expression: '1000*1000' });

            expect(response.status).to.equal(200);
            expect(response.body.result).to.equal(formatAndRoundNumberReturns);
            expect(parseInputStub).calledOnceWithExactly('1000*1000');
            expect(parseAndCalculateStub).calledOnceWithExactly(['1000', '*', '1000']);
            expect(parseAndFormatStub).calledOnceWithExactly(1000000);
        });
    });

    describe('ParenthesesHandlerService', () => {
        it('interacts with InputParserService', () => {
            const parseFirstNegativeNumberStub = sinon.stub(inputParserService, 'parseFirstNegativeNumber');
            const parseAndCalculateStub = sinon.stub(inputParserService, 'parseAndCalculateExpression');

            parseFirstNegativeNumberStub.onCall(0).returns(['0', '-', '5', '+', '2']);
            parseAndCalculateStub.onCall(0).returns('-3');

            expect(parenthesesHandlerService.parseByParentheses(['2', '*', '(', '-', '5', '+', '2', ')'])).deep.eq(['2', '*', '-3']);
            expect(parseFirstNegativeNumberStub).calledOnceWith(['-', '5', '+', '2']);
            expect(parseAndCalculateStub).calledOnceWith(['0', '-', '5', '+', '2']);
        });
    });
});
