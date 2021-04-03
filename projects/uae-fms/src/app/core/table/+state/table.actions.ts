import { createAction, props } from '@ngrx/store';
import { ITablePagination } from '@core/table/+state/table.entity';

export class TableActions {

  static initial = createAction(
    '[Table] Create',
    props<{ data: string }>()
  );

  static next = createAction(
    '[Table] Next Page'
  );

  static previous = createAction(
    '[Table] Previous Page'
  );

  static rowCount = createAction(
    '[Table] Row Count',
    props<{ data: number }>()
  )

}
