import {inputParserService} from "./input-parser";
import {formatterService} from "./formatter";
import {calculationsService} from "./calculations";
import {parenthesesHandlerService} from "./parentheses-handler";
import {tokensHandlerService} from "./tokens-handler";
import {mathOperationsService} from "./math-operations";

export const calculatorServices = {formatterService, inputParserService, mathService: calculationsService, parenthesesHandler: parenthesesHandlerService, tokensHandlerService, mathOperationsService};
