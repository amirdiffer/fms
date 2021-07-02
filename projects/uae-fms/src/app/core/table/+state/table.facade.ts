import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ITableState } from '@core/table/+state/table.entity';
import { TableActions } from '@core/table/+state/table.actions';
import { TableSelectors } from '@core/table/+state/table.selectors';

@Injectable()
export class TableFacade {

  constructor(private store: Store<ITableState>) {
  }

  getPaginationByName(data: string) {
    return this.store.pipe(select(TableSelectors.selectByName, { name: data }));
  }

  initialPaginator(count, name, ipp?: number) {
    this.store.dispatch(TableActions.initial({ ipp: ipp ? ipp : 10, count, name }))
  }

  next(name) {
    this.store.dispatch(TableActions.next({ name }))
  }

  previous(name) {
    this.store.dispatch(TableActions.previous({ name }))
  }

  rowCount(data, name) {
    this.store.dispatch(TableActions.rowCount({ data, name }))
  }

  count(data, name) {
    this.store.dispatch(TableActions.count({ data, name }))
  }

  page(data, name) {
    this.store.dispatch(TableActions.page({ data, name }))
  }

  reset(name) {
    this.store.dispatch(TableActions.reset({ name }))
  }

  getFiltersByName(data: string) {
    return this.store.pipe(select(TableSelectors.filters_selectByName, { name: data }));
  }

  initialFilters(name) {
    this.store.dispatch(TableActions.filters_initial({ name, value: [] }))
  }

  setFilters(name, value) {
    this.store.dispatch(TableActions.filters({ name, value }))
  }

}
