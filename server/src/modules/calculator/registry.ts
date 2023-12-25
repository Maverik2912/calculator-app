import {IModule} from "@src/common-interfaces";
import {CalculatorControllersType, CalculatorServicesType} from "./types";
import {calculatorRouters} from "./routers";
import {calculatorServices} from "./services";
import {calculatorControllers} from "./controllers";
import {CalculatorRoutersType} from "./types/calculatorRouters.type";
import {HistoryModuleState} from "../history/enums";

export const calculatorModuleRegistry: IModule<HistoryModuleState, CalculatorRoutersType, CalculatorControllersType, CalculatorServicesType, void> = {
    calculatorModule: {
        Routers: calculatorRouters,
        Controllers: calculatorControllers,
        Services: calculatorServices
    }
}
