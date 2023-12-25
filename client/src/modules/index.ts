import {apiManagerModuleRegistry} from "./api-manager";
import {clientModuleConfig} from "./config";
import {viewModuleRegistry} from "./view";

export const clientModulesRegistry = {
    apiManager: apiManagerModuleRegistry.apiManagerModule[clientModuleConfig.apiManagerModule],
    view: viewModuleRegistry.viewModule[clientModuleConfig.viewModule],
}