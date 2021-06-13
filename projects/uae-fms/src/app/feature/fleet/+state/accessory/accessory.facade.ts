import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AccessorySelectors } from './accessory.selectors';
import { IAccessoryPartialState } from './accessory.entity';
import { AccessoryActions } from './accessory.actions';


@Injectable()
export class AccessoryFacade {
  accessory$ = this.store.pipe(select(AccessorySelectors.selectAll));

  statistics$ = this.store.pipe(select(AccessorySelectors.selectStatistics));

  message$ = this.store.pipe(select(AccessorySelectors.message));

  error$ = this.store.pipe(select(AccessorySelectors.error));

  submitted$ = this.store.pipe(select(AccessorySelectors.submitted));

  constructor(private store: Store<IAccessoryPartialState>) {
    this.loadAll();
  }

  loadAll() {
    this.store.dispatch(AccessoryActions.loadAll());
  }
  loadStatistics() {
    this.store.dispatch(AccessoryActions.loadStatistics());
  }
  addAccessory(data: any) {
    this.store.dispatch(AccessoryActions.addAccessory({ data }));
  }
  editAccessory(data: any, id: number) {
    this.store.dispatch(AccessoryActions.editAccessory({ data, id }));
  }

  reset() {
    this.store.dispatch(AccessoryActions.reset());
  }
}
