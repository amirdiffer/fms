import { PartListActions } from './part-list.actions';
import { PartListStateModel } from './part-list.entity';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PartListSelectors } from './part-list.selectors';

@Injectable()
export class PartListFacade {
  partList$ = this.store.pipe(select(PartListSelectors.selectAll));

  message$ = this.store.pipe(select(PartListSelectors.message));

  error$ = this.store.pipe(select(PartListSelectors.error));

  constructor(private store: Store<PartListStateModel>) {}

  loadAll() {
    this.store.dispatch(PartListActions.loadAll());
  }
}
