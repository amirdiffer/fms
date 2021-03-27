import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MovementOverviewSelectors } from './movement-overview.selectors';
import { MovementOverviewPartialState } from './movement-overview.entity';
import { MovementOverviewActions } from './movement-overview.actions';

@Injectable()
export class MovementOverviewFacade {
  MovementOverview$ = this.store.pipe(
    select(MovementOverviewSelectors.selectAll)
  );

  message$ = this.store.pipe(select(MovementOverviewSelectors.message));

  error$ = this.store.pipe(select(MovementOverviewSelectors.error));

  submitted$ = this.store.pipe(select(MovementOverviewSelectors.submitted));

  constructor(private store: Store<MovementOverviewPartialState>) {}

  loadAll() {
    this.store.dispatch(MovementOverviewActions.loadAll());
  }

  addMovementRequest(data: any) {
    this.store.dispatch(MovementOverviewActions.addMovementRequest({ data }));
  }

  editMovementRequest(data: any) {
    this.store.dispatch(MovementOverviewActions.editMovementRequest({ data }));
  }

}
