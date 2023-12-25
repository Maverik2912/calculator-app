import {expect} from "chai";

import {parenthesesHandlerService} from "@modules/calculator/services";
import {BadRequestException} from "@errors";

describe('ParenthesesHandlerService - parseByParentheses', () => {
    const executedFunction = parenthesesHandlerService.parseByParentheses.bind(parenthesesHandlerService);

    it('should return the same array of strings if no parentheses found', () => {
        expect(executedFunction(['2', '+', '5'])).to.deep.equal(['2', '+', '5']);
    });

    it('should parse expression into parentheses, send into CalculationsService, and return array of strings without parentheses', () => {
        expect(executedFunction(['2', '*', '(', '10', '-', '2', ')'])).to.deep.equal(['2', '*', '8']);
    });

    it('should throw BadRequestException if there is unclosed parenthesis within expression', () => {
        expect(() => executedFunction(['10', '*', '(', '5', '-', '3'])).to.throw(BadRequestException);
    });

    it('should throw BadRequestException if there is extra parenthesis within expression', () => {
        expect(() => executedFunction(['10', '*', '(', '5', '-', '3', ')', ')'])).to.throw(BadRequestException);
    });

    it('should throw BadRequestException if there is an incorrect sequence with parentheses', () => {
        expect(() => executedFunction(['10', '*', ')', '(', '25', '-', '10', ')'])).to.throw(BadRequestException);
    });
});