import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MovementOverviewSelectorsTemporary } from './movement-overview.selectors';
import { MovementOverviewPartialState } from './movement-overview.entity';
import { MovementOverviewActionsTemporary } from './movement-overview.actions';

@Injectable()
export class MovementOverviewFacadeTemporary {
  MovementOverview$ = this.store.pipe(
    select(MovementOverviewSelectorsTemporary.selectAll)
  );

  message$ = this.store.pipe(
    select(MovementOverviewSelectorsTemporary.message)
  );

  error$ = this.store.pipe(select(MovementOverviewSelectorsTemporary.error));

  conut$ = this.store.pipe(select(MovementOverviewSelectorsTemporary.count));

  constructor(private store: Store<MovementOverviewPartialState>) {}

  loadAll() {
    this.store.dispatch(MovementOverviewActionsTemporary.loadAll());
  }
}
