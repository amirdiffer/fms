import { createAction, props } from '@ngrx/store';

export class PartListActions {

  /* --------- Asset Part -------------- */

    static getAccumulatedPartListOfAsset = createAction(
        '[assetPartList] load all accumulated part of asset',
        props<{ id: number }>()
    );

    static accumulatedPartListOfAssetLoaded = createAction(
        '[assetPartList] all accumulated part of asset are loaded',
        props<{ data: any[] }>()
    );

    static getPartListOfAsset = createAction(
        '[assetPartList] load all part of asset',
        props<{ id: number }>()
    );

    static partListOfAssetLoaded = createAction(
        '[assetPartList] all part of asset are loaded',
        props<{ data: any[] }>()
    );

    static updatePartOfAsset = createAction(
        '[assetPartList] update part of asset',
        props<{ data: any }>()
    );

    static partOfAssetUpdatedSuccessfully = createAction(
        '[assetPartList] part of asset updated successfully',
        props<{ data: any }>()
    );

    static getSpecificPartOfAsset = createAction(
        '[assetPartList] load specific part of asset',
        props<{ id: number }>()
    );

    static specificPartOfAssetLoaded = createAction(
        '[assetPartList] specific part of asset are loaded',
        props<{ data: any[] }>()
    );


    /* --------- Sub Asset Part -------------- */


    static getAccumulatedPartListOfSubAsset = createAction(
        '[assetPartList] load all accumulated part of sub asset',
        props<{ id: number }>()
    );

    static accumulatedPartListOfSubAssetLoaded = createAction(
        '[assetPartList] all accumulated part of sub asset are loaded',
        props<{ data: any[] }>()
    );

    static getPartListOfSubAsset = createAction(
        '[subAssetPartList] load all part list of sub asset',
        props<{ id: number }>()
    );

    static partListOfSubAssetLoaded = createAction(
        '[subAssetPartList] all part of sub asset are loaded',
        props<{ data: any[] }>()
    );

    static updatePartOfSubAsset = createAction(
        '[subAssetPartList] update part of sub asset',
        props<{ data: any }>()
    );

    static partOfSubAssetUpdatedSuccessfully = createAction(
        '[subAssetPartList] part of sub asset updated successfully',
        props<{ data: any }>()
    );

    static getSpecificPartOfSubAsset = createAction(
        '[subAssetPartList] load specific part of sub asset',
        props<{ id: number }>()
    );

    static specificPartOfSubAssetLoaded = createAction(
        '[subAssetPartList] specific part of sub asset are loaded',
        props<{ data: any[] }>()
    );
    
    /* Reset Error */
    static resetAssetPartState = createAction(
        '[assetPartList] reset asset part state parameters'
    );

    static errorAssetPart = createAction(
        '[assetPartList] error occurred',
        props<{ reason: any }>()
    );

    static resetSubAssetPartState = createAction(
        '[partList] reset sub asset part state parameters'
    );

    static errorSubAssetPart = createAction(
        '[partList] error occurred',
        props<{ reason: any }>()
    );
}
