import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PartMasterActions } from './part-master.actions';
import { PartMasterStateModel } from './part-master.entity';
import { PartMasterSelectors } from './part-master.selectors';

@Injectable()
export class PartMasterFacade {
  partMaster$ = this.store.pipe(select(PartMasterSelectors.selectAll));

  message$ = this.store.pipe(select(PartMasterSelectors.message));

  error$ = this.store.pipe(select(PartMasterSelectors.error));

  constructor(private store: Store<PartMasterStateModel>) {}

  loadAll() {
    this.store.dispatch(PartMasterActions.loadAll());
  }
}
