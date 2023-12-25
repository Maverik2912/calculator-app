import {IModule} from "@src/common-interfaces";
import {HistoryControllersType, HistoryRepositoriesType, HistoryRoutersType, HistoryServicesType} from "./types";
import {historyRouter} from "./routers";
import {historyController} from "./controllers";
import {historyService} from "./services";
import {historyRepository} from "./repositories";
import {configs} from "@configs";
import {HistoryModuleState} from "./enums";


export const historyModuleRegistry: IModule<HistoryModuleState, HistoryRoutersType, HistoryControllersType, HistoryServicesType, HistoryRepositoriesType> = {
    historyModule: {
        state: configs.HISTORY_MODULE_STATE as HistoryModuleState,
        Routers: historyRouter,
        Controllers: historyController,
        Services: historyService,
        Repositories: historyRepository,
    }
}