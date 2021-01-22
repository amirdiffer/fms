import { Injectable } from '@angular/core';
import { createSelector, select, Store } from '@ngrx/store';
import { selectRouterState } from '../../core.state';

@Injectable()
export class RouterFacade {
  public route$ = this.store.pipe(
    select(createSelector(selectRouterState, (state) => state?.state))
  );

  constructor(private store: Store) {}
}
