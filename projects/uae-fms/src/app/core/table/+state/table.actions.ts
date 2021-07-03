import { createAction, props } from '@ngrx/store';
import { ITablePagination } from '@core/table/+state/table.entity';

export class TableActions {

  static initial = createAction(
    '[Table] Create',
    props<{ ipp: number, count: number, name: string }>()
  );

  static next = createAction(
    '[Table] Next Page',
    props<{ name: string }>()
  );

  static previous = createAction(
    '[Table] Previous Page',
    props<{ name: string }>()
  );

  static rowCount = createAction(
    '[Table] Row Count',
    props<{ data: number, name: string }>()
  );

  static count = createAction(
    '[Table] All Row Count',
    props<{ data: number, name: string }>()
  );

  static page = createAction(
    '[Table] Page',
    props<{ data: number, name: string }>()
  );

  static reset = createAction(
    '[Table] reset Param',
    props<{ name: string }>()
  );

  static filters_initial = createAction(
    '[Table] Filters Create',
    props<{ name: string, value: object[] }>()
  );

  static filters = createAction(
    '[Table] Filters',
    props<{ name: string, value: object[] }>()
  );

}
