import {expect} from "chai";

import {calculationsService} from "../Calculations.service";
import {add, divide, multiply, sin, squareRoot, subtract} from "@utils";
import {BadRequestException} from "@errors";

describe('CalculationsService - calculateAndValidateResult', () => {
    const executedMethod = calculationsService.calculateAndValidateResult.bind(calculationsService);

    it('should correctly calculate simple math operation', () => {
        expect(executedMethod(subtract, ['3', '2'])).to.equal(1);
    });

    it('should throw BadRequestException for Infinity result', () => {
        expect(() => executedMethod(divide, ['1', '0'])).to.throw(BadRequestException);
    });

    it('should correctly calculate engineering math operation', () => {
        expect(executedMethod(sin, ['50'])).to.equal(-0.26237485370392877);
    });

    it('should correctly calculate advanced math operation', () => {
        expect(executedMethod(squareRoot, ['25'])).to.equal(5);
    });

    it('should correctly calculate expression with float numbers', () => {
        expect(executedMethod(multiply, ['0.2', '0.3'])).to.equal(0.06);
    });

    it('should throw BadRequestException if there is operand deficit within expression', () => {
        expect(() => executedMethod(add, ['1'])).to.throw(BadRequestException);
    });

    it('should throw BadRequestException for an invalid expression', () => {
        expect(() => executedMethod(add, ['a', '2'])).to.throw(BadRequestException);
    });
});

describe('CalculationsService - isMathOperator', () => {
    const isMathOperator = calculationsService.isMathOperator.bind(calculationsService);

    it('should return true if passed parameter is available math operator', () => {
        expect(isMathOperator('+')).to.equal(true);
    });

    it('should return false if passed parameter is unavailable math operator', () => {
        expect(isMathOperator('$')).to.equal(false);
    });
});