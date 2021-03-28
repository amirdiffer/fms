import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UsersPartialState } from './users.entity';
import { UsersSelectors } from './users.selectors';
import { UsersActions } from './users.actions';

@Injectable()
export class UsersFacade {
  users$ = this.store.pipe(select(UsersSelectors.selectAll));

  message$ = this.store.pipe(select(UsersSelectors.message));

  error$ = this.store.pipe(select(UsersSelectors.error));

  constructor(private store: Store<UsersPartialState>) {}

  loadAll() {
    this.store.dispatch(UsersActions.loadAll());
  }
}
