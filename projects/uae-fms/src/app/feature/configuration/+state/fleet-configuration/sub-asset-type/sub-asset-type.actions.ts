import { IAssetType } from "@models/asset-type.model";
import { createAction, props } from "@ngrx/store";

export class SubAssetTypeActions {
    /* Load Sub-Asset Type */
    static loadAll = createAction('[subAssetType] load all data');

    static allDataLoaded = createAction(
        '[subAssetType] all datas are loaded',
        props<{ data: IAssetType[] }>()
    );


    /* Get Sub Asset By Id */
    static subAssetTypeById = createAction(
        '[subAssetType] load sub asset type by Id',
        props<{ id: number }>()
    );
    static subAssetByIdLoaded = createAction(
        '[subAssetType] specific sub asset type loaded',
        props<{ data: any }>()
    );


    /* Add Sub-Asset Type */
    static addSubAssetType = createAction(
        '[subAssetType] add sub asset type',
        props<{ data: any }>()
    );

    static subAssetTypeAddedSuccessfully = createAction(
        '[subAssetType] sub asset type added successfully',
        props<{ data: any }>()
    );

    /* Update Sub Asset Type */
    static updateSubAssetType = createAction(
        '[subAssetType] update sub asset type',
        props<{ data: any }>()
    );

    static subAssetTypeUpdatedSuccessfully = createAction(
        '[subAssetType] sub asset updated successfully',
        props<{ data: any }>()
    );


    /* Add Make */
    static addMake = createAction(
        '[subAssetType] add make',
        props<{ data: any, subAssetTypeId: number }>());

    static makeAddedSuccessfully = createAction(
        '[subAssetType] make added successfully',
        props<{ data: any }>()
    );



    /* Update Make */
    static updateMake = createAction(
        '[subAssetType] update make',
        props<{ data: any, subAssetTypeId: number }>());

    static makeUpdatedSuccessfully = createAction(
        '[subAssetType] make updated successfully',
        props<{ data: any }>()
    );


    /* Add Model */
    static addModel = createAction(
        '[subAssetType] add model',
        props<{ data: any, subAssetTypeId: number, makeId: number }>()
    );

    static modelAddedSuccessfully = createAction(
        '[subAssetType] model added successfully',
        props<{ data: any }>()
    );

    /* Update Model */
    static updateModel = createAction(
      '[subAssetType] update model',
      props<{ data: any, subAssetTypeId: number, makeId: number }>());

    static modelUpdatedSuccessfully = createAction(
      '[subAssetType] model updated successfully',
      props<{ data: any }>()
    );

  /* Error */
    static error = createAction(
        '[subAssetType] error occurred',
        props<{ reason: any }>()
    );


    /* Reset Params */
    static resetParams = createAction('[subAssetType] Reset Parameters');
}
