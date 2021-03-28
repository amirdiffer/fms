import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OwnershipSelectors } from './ownership.selectors';
import { OwnershipPartialState } from './ownership.entity';
import { OwnershipActions } from './ownership.actions';

@Injectable()
export class OwnershipFacade {
  ownership$ = this.store.pipe(select(OwnershipSelectors.selectAll));

  message$ = this.store.pipe(select(OwnershipSelectors.message));

  error$ = this.store.pipe(select(OwnershipSelectors.error));

  constructor(private store: Store<OwnershipPartialState>) {}

  loadAll() {
    this.store.dispatch(OwnershipActions.loadAll());
  }
}
