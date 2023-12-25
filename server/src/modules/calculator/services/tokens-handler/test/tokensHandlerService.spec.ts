import {expect} from "chai";

import {tokensHandlerService} from "../TokensHandler.service";
import {BadRequestException} from "@errors";

describe('TokensHandlerService - validateTokens', () => {
    const executedFunction = tokensHandlerService.validateTokens.bind(tokensHandlerService);

    it('should throw BadRequestException if an invalid token is found', () => {
        expect(() => executedFunction(['1', '$', '2'])).to.throw(BadRequestException);
    });
});

describe('TokensHandlerService - tokenizeExpression', () => {
    const executedFunction = tokensHandlerService.tokenizeExpression.bind(tokensHandlerService);

    it('should split string into tokens using RegExp', () => {
        expect(executedFunction('2+5-3')).to.deep.equal(['2', '+', '5', '-', '3']);
    });
});