import { createAction, props } from '@ngrx/store';
import { IAccessory } from '@models/accessory';

export class SuppliersActions {

  /* '''''Load''''' Supplier */
  static loadAll = createAction(
    '[SuppliersList] load all data'
  );

  static allSupplierLoaded = createAction(
    '[supplierList] all supplier are loaded',
    props<{ data: any[] }>()
  );
  

  /* ''''''Add'''''' Supplier */
  static addSupplier= createAction(
    '[supplierList] add supplier',
    props<{ data: any }>()
  );

  static supplierAddedSuccessfully = createAction(
    '[supplierList] supplier added successfully',
    props<{ data: any }>()
  );


   /* '''''Get''''' Specific Supplier */
   static getSpecificSupplier = createAction(
    '[supplierList] load specific supplier',
    props<{ id: number }>()
  );

  static specificSupplierLoaded = createAction(
    '[supplierList] specific supplier are loaded',
    props<{ data: any[] }>()
  );


  /* '''''Update''''' Supplier */
  static updateSupplier = createAction(
    '[supplierList] update supplier',
    props<{ data: any }>()
  );

  static supplierUpdatedSuccessfully = createAction(
    '[supplierList] supplier updated successfully',
    props<{ data: any }>()
  );


  static error = createAction(
    '[supplierList] error occurred',
    props<{ reason: any }>()
  );

  static reset = createAction(
    '[supplierList] reset parameters'
  );
}
