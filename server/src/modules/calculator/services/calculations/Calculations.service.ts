import {ICalculationsService} from "./interface";
import {BadRequestException} from "@errors";
import {mathOperations} from "../../config";
import {textMessages} from "@texts";
import {IMathOperation} from "../../interfaces";
import {InstanceName} from "../../enums";
import {LoggerUtil} from "@modules/logger/utils";

/**
 * Implementation of the IMathService interface.
 * @implements ICalculationsService
 */
class CalculationsService implements ICalculationsService {
    constructor() {}

    /**
     * Method for calculating and validating the result of a mathematical operation.
     * @param operation The operation to be performed (addition, subtraction, etc.).
     * @param operands Operands for performing the operation.
     * @returns {number} The result of the operation.
     * @throws {BadRequestException} Thrown in case of an invalid expression or if number equals to Infinity or -Infinity.
     */
    public calculateAndValidateResult(operation: IMathOperation['operation'], operands: string[]): number {
        const {
            workStatus: {START, FINISH},
            error: {INVALID_EXPRESSION_TEXT, NUMBER_IS_TOO_BIG},
            modules: {calculator: {service: {calculations: {BAD_REQUEST, CALCULATIONS_SUCCESS}}}}
        } = textMessages;

        LoggerUtil.getLogger().logInfo({message: START, instanceName: InstanceName.CALCULATIONS_SERVICE_CALC_AND_VALIDATE});

        const result = this.executeOperation(operation, ...operands.map((operand) => +operand));

        if (Number.isNaN(result)) {
            LoggerUtil.getLogger().logDebug({message: BAD_REQUEST, metadata: {message: INVALID_EXPRESSION_TEXT}, instanceName: InstanceName.CALCULATIONS_SERVICE_CALC_AND_VALIDATE});
            throw new BadRequestException(INVALID_EXPRESSION_TEXT);
        }

        if (result === Infinity || result === -Infinity) {
            LoggerUtil.getLogger().logDebug({message: BAD_REQUEST, metadata: {message: NUMBER_IS_TOO_BIG}, instanceName: InstanceName.CALCULATIONS_SERVICE_CALC_AND_VALIDATE});
            throw new BadRequestException(NUMBER_IS_TOO_BIG);
        }

        LoggerUtil.getLogger().logDebug({message: CALCULATIONS_SUCCESS, metadata: {result}, instanceName: InstanceName.CALCULATIONS_SERVICE_CALC_AND_VALIDATE});
        LoggerUtil.getLogger().logInfo({message: FINISH, instanceName: InstanceName.CALCULATIONS_SERVICE_CALC_AND_VALIDATE});

        return result;
    }

    /**
     * Method to check if a character is a mathematical operator.
     * @param char The character to check.
     * @returns {boolean} `true` if the character is a mathematical operator, otherwise `false`.
     */
    public isMathOperator(char: string): boolean {
        const operators = this.getAvailableOperators();
        return operators.includes(char);
    }

    /**
     * Method to get the available mathematical operators.
     * @returns {string[]} Array of mathematical operators.
     */
    public getAvailableOperators(): string[] {
        return Object.keys(mathOperations);
    }

    /**
     * Private method for executing a mathematical operation.
     * @param operation The operation function to be executed.
     * @param operands Operands for performing the operation.
     * @returns {number} The result of the operation.
     * @private
     */
    private executeOperation(operation: Function, ...operands: number[]): number {
        return operation(...operands);
    }
}

export const calculationsService = new CalculationsService();
