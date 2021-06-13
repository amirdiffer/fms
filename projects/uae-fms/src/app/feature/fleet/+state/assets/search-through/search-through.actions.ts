import { createAction, props } from "@ngrx/store";
import { IAssetSearchThrough } from "./search-through.entity";

export class AssetSearchThroughActions {

    /* All Available Assets */
    static loadAvailableAsset = createAction(
        '[assetSearchThrough] load all available assets'
    );
    static allAvailableAsset = createAction(
        '[assetSearchThrough] all available assets data are loaded',
        props<{ data: IAssetSearchThrough[] }>()
    );



    /* All Available Asset For Adding Request*/
    static loadAvailableAssetForAddingRequest = createAction(
        '[assetSearchThrough] load all available assets for adding request'
    );
    static allAvailableAssetForAddingRequestLoaded = createAction(
        '[assetSearchThrough] all available assets data for adding request are loaded',
        props<{ data: IAssetSearchThrough[] }>()
    );


    
     /* All Available Asset For Adding Job Card*/
    static loadAvailableAssetForAddingJobCard = createAction(
        '[assetSearchThrough] load all available assets for adding job card'
    );
    static allAvailableAssetForAddingJobCardLoaded = createAction(
        '[assetSearchThrough] all available assets data for adding job card are loaded',
        props<{ data: IAssetSearchThrough[] }>()
    );

}