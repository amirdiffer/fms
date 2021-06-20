import { createAction, props } from "@ngrx/store";
import { IAccessorySearchThrough } from "./search-through.entity";

export class AccessorySearchThroughActions{


    static loadAvailableAccessory = createAction(
        '[accessorySearchThrough] load all available accessory'
    );

    static allAvailableAccessoryLoaded = createAction(
        '[accessorySearchThrough] all available accessory data are loaded',
        props<{ data: IAccessorySearchThrough[] }>()
    );


    static error = createAction(
        '[accessorySearchThrough] error occurred',
        props<{ reason: any }>()
    );


}