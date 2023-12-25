import {expect} from "chai";

import {inputParserService} from "../InputParser.service";
import {BadRequestException} from "@errors";


describe('InputParserService - parseFirstNegativeNumber', () => {
    it('should add 0 in the beginning on the expression if the first number is negative', () => {
        expect(inputParserService.parseFirstNegativeNumber(['-', '2', '+', '5'])).to.deep.equal(['0', '-', '2', '+', '5']);
    });
});

describe('InputParserService - parseInputOrThrow', () => {
    const executedMethod = inputParserService.parseInputOrThrow.bind(inputParserService);

    it('should return 0 if passed value is an empty string', () => {
        expect(executedMethod('')).to.deep.equal(['0']);
    });
});

describe('InputParserService - parseAndCalculateExpression', () => {
    const executedFunction = inputParserService.parseAndCalculateExpression.bind(inputParserService);

    it('if value is just a number, should return the same number', () => {
        expect(executedFunction(['0'])).to.equal('0');
    });

    it('should throw BadRequestException if division by zero has been found', () => {
        expect(() => executedFunction(['2', '/', '0'])).to.throw(BadRequestException);
    });

    it('should calculate the expression and return the calculated result', () => {
        expect(executedFunction(['12', '+', '5', '*', '2'])).to.equal('22');
    });
});