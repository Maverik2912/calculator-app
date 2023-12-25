import {modulesConfig} from "./config";
import {calculatorModuleRegistry} from "./calculator";
import {historyModuleRegistry} from "./history";
import {loggerModuleRegistry} from "./logger";

export const modulesRegistry = {
    Calculator: calculatorModuleRegistry[modulesConfig.Calculator],
    History: historyModuleRegistry[modulesConfig.History],
    Logger: loggerModuleRegistry[modulesConfig.Logger],
}