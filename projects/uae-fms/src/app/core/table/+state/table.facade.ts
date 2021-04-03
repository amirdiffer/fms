import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ITableState } from '@core/table/+state/table.entity';
import { TableActions } from '@core/table/+state/table.actions';
import { TableSelectors } from '@core/table/+state/table.selectors';

@Injectable()
export class TableFacade {

  constructor(private store: Store<ITableState>) {
  }

  getPaginationById(data: string) {
    return this.store.pipe(select(TableSelectors.selectById, { name: data }));
  }

  initialPaginator(data) {
    this.store.dispatch(TableActions.initial({ data }))
  }

}
