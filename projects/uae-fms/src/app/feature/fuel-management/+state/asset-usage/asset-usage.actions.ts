import { createAction, props } from "@ngrx/store";
import { IAssetUsageStateModel } from "./asset-usage.entity";


export class AssetUsageActions {
    static loadAssetUsage = createAction ('[assetUsage] load all data');
    static assetUsageLoaded = createAction ('[assetUsage] all datas are loade', props<{ data : IAssetUsageStateModel[]}>());
    static assetUsageError = createAction ('[assetUsage] error occurred', props<{reason:any}>());
}