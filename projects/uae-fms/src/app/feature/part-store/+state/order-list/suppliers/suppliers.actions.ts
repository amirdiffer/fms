import { createAction, props } from '@ngrx/store';
import { IAccessory } from '@models/accessory';

export class SuppliersActions {
  static loadAll = createAction('[SuppliersList] load all data');

  static allDataLoaded = createAction(
    '[SuppliersList] all datas are loaded',
    props<{ data: any[] }>()
  );

  static addSupplier = createAction(
    '[SuppliersList] add supplier',
    props<{ data: any }>()
  );

  static supplierAddedSuccessfully = createAction(
    '[SuppliersList] supplier added successfully',
    props<{ data: IAccessory }>()
  );

  static error = createAction(
    '[SuppliersList] error occurred',
    props<{ reason: any }>()
  );

  static reset = createAction('[SuppliersList] supplier resets');
}
