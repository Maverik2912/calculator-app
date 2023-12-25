import {configs} from '@configs';

/**
 * Text messages
 */
export const textMessages = {
    workStatus: {
        START: 'Method started to work',
        FINISH: 'Method completed it\'s work successfully',
    },
    error: {
        INVALID_EXPRESSION_TEXT: 'enter valid expression',
        DIVIDED_BY_NULL: 'cannot be divided by 0',
        NUMBER_IS_TOO_BIG: 'number is too big',
        NOT_FOUND: 'item has not been found',
        RETRIEVE_FROM_HISTORY: 'error occurred during retrieving items from DB',
        SAVE_TO_DB: 'error occurred during saving item to DB',
        UPDATE_ITEM: 'error occurred during updating item in DB',
        DELETE_ITEM: 'error occurred during deleting item from DB',
        DELETE_ITEMS: 'error occurred during deleting items from DB',
        CREATE_COLLECTION: 'error occurred during creating collection in DB',
    },
    server: {
        START_MESSAGE: `Server started to work at PORT ${configs.PORT}`,
    },
    db: {
        UNSUPPORTED_DB_TYPE: 'Unsupported database type',
        ITEM_ADDED: 'Added new item to history',
        ITEM_UPDATED: 'Item successfully updated',
        ITEM_DELETED: 'Item successfully deleted',
        ITEM_RETRIEVED: 'Item successfully retrieved',
        ITEMS_DELETED: 'Items successfully deleted',
        ITEMS_RETRIEVED: 'Items successfully retrieved from history',
        CONNECTION_SUCCESS: 'Connection has been successfully established',
        CONNECTION_FAILED: 'Connection has failed',
        DISCONNECT_SUCCESS: 'Disconnecting successfully',
        DISCONNECT_FAILED: 'Error during disconnection',
        DELETED_EXPIRED_ITEMS: 'Expired items has been successfully deleted',
        COLLECTION_CREATED: 'Collection has been successfully created',
    },
    validationMessage: {
        expression: {
            REQUIRED: 'Expression is required',
            SHOULD_BE_STRING: 'Expression must be a string.',
            EMPTY_FIELD: 'Expression should not be empty.',
        },
        result: {
            REQUIRED: 'Result is required',
            SHOULD_BE_STRING: 'Result must be a string.',
            EMPTY_FIELD: 'Result should not be empty.',
        }
    },
    modules: {
        history: {
            controller: {
                HISTORY_DISABLED: 'History module is disabled',
                GET_HISTORY_LIST_ERROR: 'Error in historyController getHistoryList',
                INVOKE_SERVICE_GET_HISTORY: 'historyService.getHistoryList() invoked',
            },
            service: {
                INVOKE_REPO_GET_ONE: 'historyRepository.getOneByField() invoked',
                INVOKE_REPO_UPDATE_ONE: 'historyRepository.updateOneByDto() invoked',
                INVOKE_REPO_CREATE: 'historyRepository.create() invoked',
                INVOKE_REPO_GET_MANY: 'historyRepository.getMany() invoked',
                CREATE_ERROR: 'Error in historyService method create',
                GET_HISTORY_LIST_ERROR: 'Error in historyService getHistoryList',
            }
        },
        calculator: {
            controller: {
                mathOperations: {
                    INVOKE_SERVICE_GET_DATA: 'mathOperationsService.getData() invoked',
                    GET_DATA_ERROR: 'Error in mathOperationsController getData'
                },
                expression: {
                    RECEIVED_EXPRESSION: 'Received expression',
                    PARSED_BY_PARENTHESES: 'Expression parsed by parentheses',
                    NOT_FORMATTED_RESULT: 'Not formatted result',
                    FORMATTED_RESULT: 'Formatted result',
                    INVOKE_HISTORY_SERVICE_CREATE: 'historyService.create() invoked',
                    CALCULATE_ERROR: 'Error in expressionController calculateAndSaveToDb',
                }
            },
            service: {
                calculations: {
                    CALCULATIONS_SUCCESS: 'calculations completed',
                    BAD_REQUEST: 'calculationsService throws BadRequestException',
                },
                formatter: {
                    LONG_FLOAT_NUMBER: 'Long float number formatted successfully',
                    LONG_INT_NUMBER: 'Long integer number formatted successfully',
                    DELIMITER_ADDED: 'Delimiter added if needed',
                },
                tokensHandler: {
                    EXPRESSION_TOKENIZED: 'Expression successfully tokenized',
                },
                inputParser: {
                    EMPTY_EXPRESSION: 'Handled empty expression',
                    EXPRESSION_FORMATTED: 'parseInputOrThrow.getFormattedExpressionOrThrow() invoked and successfully formatted expression',
                    INVOKE_PARSE_BY_PARENTHESES: ' parenthesesHandlerService.parseByParentheses() invoked',
                    EXPRESSION_IS_NULL_OR_UNDEFINED: 'parseAndCalculateExpression throws BadRequestException because passed expression is null or undefined',
                    PARSED_SUCCESSFULLY: 'Expression parsed and result returned',
                }
            }
        }
    }
}