import {IFormatterService} from "./interface";
import {calculationsConstants} from "../calculations";
import {textMessages} from "@texts";
import {InstanceName} from "../../enums";
import {LoggerUtil} from "@modules/logger/utils";

/**
 * Service for formatting and rounding numbers.
 * @class
 * Implementation of FormatService interface
 * @implements IFormatterService
 * @see {@link calculationsConstants}
 */
class FormattingService implements IFormatterService{
    /**
     * Formats and rounds a number.
     * @param num - The number to be formatted and rounded.
     * @returns {string} The formatted and rounded number.
     */
    public formatAndRoundNumber(num: number): string {
        const {LONG_FLOAT_NUMBER, LONG_INT_NUMBER, DELIMITER_ADDED} = textMessages.modules.calculator.service.formatter;
        LoggerUtil.getLogger().logInfo({message: textMessages.workStatus.START, instanceName: InstanceName.FORMATTER_SERVICE_FORMAT_AND_ROUND_NUMBER});

        const formattedResult = this.toFixedIfTooLong(num);
        LoggerUtil.getLogger().logDebug({message: LONG_FLOAT_NUMBER, metadata: {result: formattedResult, instanceName: InstanceName.FORMATTER_SERVICE_FORMAT_AND_ROUND_NUMBER}});

        if (this.isNumberTooLong(+formattedResult)) {
            const exponentialResult = Number(formattedResult).toExponential();
            LoggerUtil.getLogger().logDebug({message: LONG_INT_NUMBER, metadata: {result: exponentialResult}, instanceName: InstanceName.FORMATTER_SERVICE_FORMAT_AND_ROUND_NUMBER});
            return exponentialResult;
        }

        const resultWithDelimiter = this.addDelimiter(+formattedResult, ' ');
        LoggerUtil.getLogger().logDebug({message: DELIMITER_ADDED, metadata: {result: resultWithDelimiter}, instanceName: InstanceName.FORMATTER_SERVICE_FORMAT_AND_ROUND_NUMBER});
        LoggerUtil.getLogger().logInfo({message: textMessages.workStatus.FINISH, instanceName: InstanceName.FORMATTER_SERVICE_FORMAT_AND_ROUND_NUMBER});

        return resultWithDelimiter;
    }

    /**
     * Converts the number to a fixed format if it has too many digits.
     * @param num - The number to be converted.
     * @returns {string} The converted number.
     * @private
     * @see {@link FormattingService#needsFractionalFormatting}
     */
    private toFixedIfTooLong(num: number): string {
        if (this.needsFractionalFormatting(num)) {
            return num.toFixed(calculationsConstants.fractionDigits);
        }

        return num.toString();
    }

    /**
     * Checks if a number has too many digits.
     * @param num - The number to be checked.
     * @returns {boolean} `true` if the number has too many digits, otherwise `false`.
     * @private
     */
    private isNumberTooLong(num: number): boolean {
        return num.toString().length > calculationsConstants.maxLengthOfIntNumber;
    }

    /**
     * Checks if a number is a float.
     * @param num - The number to be checked.
     * @returns {boolean} `true` if the number is a float, otherwise `false`.
     * @private
     */
    private isFloat(num: number): boolean {
        return num !== parseInt(num.toString());
    }

    /**
     * Checks if a number needs fractional formatting.
     * @param num - The number to be checked.
     * @returns {boolean} `true` if the number needs fractional formatting, otherwise `false`.
     * @private
     */
    private needsFractionalFormatting(num: number): boolean {
        return this.isFloat(num) && this.getNumberOfFractionDigits(num) > calculationsConstants.fractionDigits;
    }

    /**
     * Gets the number of fractional digits in a number.
     * @param num - The number to be checked.
     * @returns {number} The number of fractional digits.
     * @private
     */
    private getNumberOfFractionDigits(num: number): number {
        const decimalPlaces = this.getDecimalPlaces(num);
        return decimalPlaces.split('').length;
    }

    /**
     * Adds a delimiter to a number.
     * @param num - The number to add a delimiter to.
     * @param delimiter - The delimiter to be added.
     * @returns {string} The number with added delimiter.
     * @private
     */
    private addDelimiter(num: number, delimiter: string): string {
        const regExp = /\B(?=(\d{3})+(?!\d))/g;

        if (this.isFloat(num)) {
            const [integerPart, decimalPlaces] = num.toString().split('.');
            const formattedIntegerPart = parseInt(integerPart).toString().replace(regExp, delimiter);
            return `${formattedIntegerPart}.${decimalPlaces}`;
        } else {
            return num.toString().replace(regExp, delimiter);
        }
    }

    /**
     * Gets the decimal places of a number.
     * @param num - The number to get decimal places from.
     * @returns {string} The decimal places.
     * @private
     */
    private getDecimalPlaces(num: number): string {
        return num.toString().match(/\.(\d+)/)[0];
    }
}

export const formatterService = new FormattingService();