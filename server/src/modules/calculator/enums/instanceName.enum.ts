export enum InstanceName {
    EXPRESSION_CONTROLLER_CALCULATE = 'expressionController.calculateAndSaveToDb()',
    MATH_OPERATIONS_CONTROLLER_GET_DATA = 'mathOperationsController.getData()',
    CALCULATIONS_SERVICE_CALC_AND_VALIDATE = 'calculationsService.calculateAndValidateResult()',
    FORMATTER_SERVICE_FORMAT_AND_ROUND_NUMBER = 'formatterService.formatAndRoundNumber()',
    INPUT_PARSER_SERVICE_PARSE_INPUT = 'inputParserService.parseInputOrThrow()',
    INPUT_PARSER_SERVICE_PARSE_AND_CALC = 'inputParserService.parseAndCalculateExpression()',
    PARENTHESES_HANDLER_SERVICE_PARSE_BY_PARENTHESES = 'parenthesesHandlerService.parseByParentheses()',
    TOKENS_HANDLER_SERVICE_TOKENIZE = 'tokensHandlerService.tokenizeExpression()',
}