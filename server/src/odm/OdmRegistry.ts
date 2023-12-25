import {adaptersRegistry} from "./adapters";
import {IAdaptersRegistry, IDatabaseAdapter} from "./interfaces";
import {ICalculatorHistoryRecord} from "../common-interfaces";
import {configs} from "@configs";

class OdmRegistry<T> {
    protected static instance: OdmRegistry<any> = null;
    protected currentAdapter: IDatabaseAdapter<T>

    private constructor(protected adaptersRegistry: IAdaptersRegistry<T>, protected adapterName: string) {
        const {Constructor} = adaptersRegistry[adapterName];
        this.currentAdapter = new Constructor();
    }

    public static getInstance<T>(adaptersRegistry: IAdaptersRegistry<T>, adapterName: string): OdmRegistry<T> {
        if(!OdmRegistry.instance || OdmRegistry.instance.adapterName !== adapterName) {
            OdmRegistry.instance = new OdmRegistry<T>(adaptersRegistry, adapterName);
        }
        return OdmRegistry.instance;
    }

    public getCurrentAdapter(): IDatabaseAdapter<T> {
        return this.currentAdapter;
    }
}

export const odmRegistry = OdmRegistry.getInstance<ICalculatorHistoryRecord>(adaptersRegistry, configs.CURRENT_DB);
