import {expect} from "chai";

import {formatterService} from "../Formatter.service";

describe('FormattingService - formatAndRoundNumber', () => {
    const executedFunction = formatterService.formatAndRoundNumber.bind(formatterService);

    it('should return the same value if input value is less than thousand', () => {
        expect(executedFunction(125)).to.equal('125');
    });

    it('should split long number with delimiter', () => {
        expect(executedFunction(1000000)).to.equal('1 000 000');
    });

    it('should return very long number as exponent', () => {
        expect(executedFunction(1000000000000)).to.equal('1e+12');
    });

    it('should round long float number', () => {
        expect(executedFunction(0.12345678937477474)).to.equal('0.12345679');
    });
});