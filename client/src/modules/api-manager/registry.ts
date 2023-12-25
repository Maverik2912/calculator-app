import {calculatorService, historyService} from "./services";

export const apiManagerModuleRegistry = {
    apiManagerModule: {
        default: {
            services: {
                calculator: calculatorService,
                history: historyService,
            }
        }
    }
}