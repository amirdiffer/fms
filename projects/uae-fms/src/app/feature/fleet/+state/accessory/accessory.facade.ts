import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AccessorySelectors } from './accessory.selectors';
import { IAccessoryPartialState } from './accessory.entity';
import { AccessoryActions } from './accessory.actions';

@Injectable()
export class AccessoryFacade {
  accessory$ = this.store.pipe(select(AccessorySelectors.selectAll));

  message$ = this.store.pipe(select(AccessorySelectors.message));

  error$ = this.store.pipe(select(AccessorySelectors.error));

  constructor(private store: Store<IAccessoryPartialState>) {}

  loadAll() {
    this.store.dispatch(AccessoryActions.loadAll());
  }
}
