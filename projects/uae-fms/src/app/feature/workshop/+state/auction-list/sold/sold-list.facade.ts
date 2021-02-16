import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ISoldListPartialState } from '@feature/workshop/+state/auction-list/sold/sold-list.entity';
import { SoldListActions } from '@feature/workshop/+state/auction-list/sold/sold-list.actions';
import { SoldListSelectors } from '@feature/workshop/+state/auction-list/sold/sold-list.selectors';
@Injectable()
export class SoldListFacade {
  soldList$ = this.store.pipe(select(SoldListSelectors.selectAll));

  constructor(private store: Store<ISoldListPartialState>) {}

  loadAll() {
    this.store.dispatch(SoldListActions.loadAll());
  }
}
