import { createAction, props } from "@ngrx/store";


export class AccessoryTypeActions {
    
    /* Load Accessory Type */
    static loadAll = createAction('[accessoryType] load all data');

    static allDataLoaded = createAction(
        '[accessoryType] all datas are loaded',
        props<{ data: any[] }>()
    );


    /* Load Accessory Type By Id*/
    static accessoryTypeById = createAction(
        '[accessoryType] load accessory type by Id',
        props<{ id: number }>()
      );
    static accessoryTypeByIdLoaded = createAction(
        '[accessoryType] specific accessory type loaded',
        props<{ data: any }>()
    );


    /* Add Accessory Type */
    static addAccessoryType = createAction(
        '[accessoryType] add accessory type',
        props<{ data: any }>()
    );
    
    static accessoryTypeAddedSuccessfully = createAction(
        '[accessoryType] accessory type added successfully',
        props<{ data: any }>()
    );

    
    /* Update Accessory Type */
    static updateAccessoryType = createAction(
        '[accessoryType] edit accessory type',
        props<{ data: any }>()
    );
    
    static accessoryUpdatedSuccessfully = createAction(
        '[accessoryType] accessory type updated successfully',
        props<{ data: any }>()
    );

    
     /* Error */
    static error = createAction(
        '[accessoryType] error occurred',
        props<{ reason: any }>()
    );


    /* Reset Params */
    static resetParams = createAction('[accessoryType] Reset Parameters');
}