import { createAction, props } from "@ngrx/store";
import { IAssetType } from '@models/asset-type.model';



export class AssetTypeActions {
    /* Load Asset Type */
    static loadAll = createAction('[assetType] load all data');
    
    static allDataLoaded = createAction(
        '[assetType] all datas are loaded',
        props<{ data: IAssetType[] }>()
    );

    
    /* Get Asset Type By Id */
    static assetTypeById = createAction(
        '[assetType] load asset type by Id',
        props<{ id: number }>()
    );
    static assetTypeByIdLoaded = createAction(
        '[assetType] specific asset type loaded',
        props<{ data: any }>()
    );


    /* Add Asset Type */
    static addAssetType = createAction(
        '[assetType] add asset type',
        props<{ data: any }>()
    );
    
    static assetTypeAddedSuccessfully = createAction(
        '[assetType] asset type added successfully',
        props<{ data: any }>()
    );


    /* Add Make */
    static addMake = createAction(
        '[assetType] add make', 
        props<{ data: any, assetId: number }>());

    static makeAddedSuccessfully = createAction(
        '[assetType] make added successfully',
        props<{ data: any }>()
    );


    /* Add Model */
    static addModel = createAction(
        '[assetType] add model',
        props<{ data: any, assetId: number, makeId: number }>()
    );

    static modelAddedSuccessfully = createAction(
        '[assetType] model added successfully',
        props<{ data: any }>()
    );

    
    /* Add Trim */
    static addTrim = createAction(
        '[assetType] add trim', 
        props<{ data: any, assetId: number, makeId: number, modelId: number }>());

    static trimAddedSuccessfully = createAction(
        '[assetType] trim added successfully',
        props<{ data: any }>()
    );

    
    /* Update Asset Type */
    static updateAssetType = createAction(
        '[assetType] update asset type',
        props<{ data: any }>()
      );
    
    static assetTypeUpdated = createAction(
        '[assetType] asset type updated successfully',
        props<{ data: any }>()
    );


    /* Error */
    static error = createAction(
        '[assetType] error occurred',
        props<{ reason: any }>()
    );
    

    /* Reset Params */
    static resetParams = createAction('[assetType] Reset Parameters');

    static resetEntities = createAction('[assetType] Reset entities');
}