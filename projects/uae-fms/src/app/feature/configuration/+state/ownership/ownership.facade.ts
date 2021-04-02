import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OwnershipSelectors } from './ownership.selectors';
import { OwnershipPartialState } from './ownership.entity';
import { OwnershipActions } from './ownership.actions';
import { IOwnerShip } from '@models/configuration';

@Injectable()
export class OwnershipFacade {
  ownership$ = this.store.pipe(select(OwnershipSelectors.selectAll));

  message$ = this.store.pipe(select(OwnershipSelectors.message));

  error$ = this.store.pipe(select(OwnershipSelectors.error));

  submitted$ = this.store.pipe(select(OwnershipSelectors.submitted));

  constructor(private store: Store<OwnershipPartialState>) { }

  loadAll() {
    this.store.dispatch(OwnershipActions.loadAll());
  }

  addOwnership(data: IOwnerShip) {
    this.store.dispatch(OwnershipActions.addOwnership({ data }));
  }

  editOwnership(data: any) {
    this.store.dispatch(OwnershipActions.editOwnership({ data }));
  }
}
