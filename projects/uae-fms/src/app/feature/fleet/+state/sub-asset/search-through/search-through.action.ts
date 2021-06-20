import { createAction, props } from "@ngrx/store";
import { ISubAssetSearchThrough } from "./search-through.entity";

export class SubAssetSearchThroughActions{


    static loadAvailableSubAssetWithModelId = createAction(
        '[subAssetSearchThrough] load all available sub asset with model id',
        props<{ id: number }>()
    );

    static allAvailableSubAssetWithModelIdLoaded = createAction(
        '[subAssetSearchThrough] all available sub asset with model id  are loaded',
        props<{ data: ISubAssetSearchThrough[] }>()
    );


    static error = createAction(
        '[subAssetSearchThrough] error occurred',
        props<{ reason: any }>()
    );


}