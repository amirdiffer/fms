import { createAction, props } from '@ngrx/store';
import { ISuppliersListModel } from '@feature/part-store/+state/order-list/suppliers/suppliers.entity';

export class SuppliersActions {
  static loadAll = createAction('[SuppliersList] load all data');

  static allDataLoaded = createAction(
    '[SuppliersList] all datas are loaded',
    props<{ data: ISuppliersListModel[] }>()
  );

  static error = createAction(
    '[SuppliersList] error occurred',
    props<{ reason: any }>()
  );
}
