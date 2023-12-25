import {expect} from "chai";

import {
    add, atan,
    cos,
    cubeRoot,
    divide,
    factorial,
    log,
    multiply,
    percentage,
    raise, sin,
    squareRoot,
    subtract, tan
} from "@utils";

describe('Math Utils', () => {
    it('add', () => {
        expect(add(3, 2)).to.equal(5);
    });

    it('subtract', () => {
        expect(subtract(10, 4)).to.equal(6);
    });

    it('multiply', () => {
        expect(multiply(5, 6)).to.equal(30);
    });

    it('divide', () => {
        expect(divide(10, 5)).to.equal(2);
    });

    it('should return Infinity when divided by 0', () => {
        expect(divide(2, 0)).to.equal(Infinity);
    });

    it('should handle other operations when divided by 0', () => {
        expect(add(5, divide(2, 0))).to.equal(Infinity);
        expect(subtract(10, divide(1, 0))).to.equal(-Infinity);
    });

    it('raise', () => {
        expect(raise(5, 2)).to.equal(25);
    });

    it('square root', () => {
        expect(squareRoot(25)).to.equal(5);
    });

    it('cube root', () => {
        expect(cubeRoot(100)).to.equal(4.641588833612779);
    });

    it('percentage', () => {
        expect(percentage(20)).to.equal(0.2);
    });

    it('factorial', () => {
        expect(factorial(5)).to.equal(120);
    });

    it('should return Infinity or -Infinity when number is too big to calculate factorial', () => {
        expect(factorial(1000)).to.equal(Infinity);
    });

    it('log based on 10', () => {
        expect(log(100)).to.equal(2);
    });

    it('cos', () => {
        expect(cos(10)).to.equal(-0.8390715290764524);
    });

    it('sin', () => {
        expect(sin(10)).to.equal(-0.5440211108893698);
    });

    it('tan', () => {
        expect(tan(10)).to.equal(0.6483608274590866);
    });

    it('atan', () => {
        expect(atan(10)).to.equal(1.4711276743037347);
    });

    it('should return NaN if invalid operand has been provided', () => {
        expect(add(5, Number('a'))).to.be.NaN;
    });

    it('should return NaN if there is missing operands', () => {
        expect(multiply(5, undefined)).to.be.NaN;
    });

    it('should handle negative numbers', () => {
        expect(squareRoot(-9)).to.be.NaN;
        expect(cubeRoot(-8)).to.equal(-2);
        expect(subtract(-2, -3)).eq(1);
    });

    it('should handle precision for complex numbers', () => {
        expect(divide(1, 3)).to.be.closeTo(0.333, 0.001);
    });

    it('should handle float numbers', () => {
        expect(multiply(0.2, 0.3)).eq(0.06);
        expect(add(0.3, 0.2)).eq(0.5);
        expect(divide(0.5, 0.2)).eq(2.5);
    })
});