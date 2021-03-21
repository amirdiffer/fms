import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UsersPartialState } from './users.entity';
import { UsersSelectors } from './users.selectors';
import { UsersActions } from './users.actions';
import { IUser } from '@models/configuration';

@Injectable()
export class UsersFacade {
  users$ = this.store.pipe(select(UsersSelectors.selectAll));

  message$ = this.store.pipe(select(UsersSelectors.message));

  error$ = this.store.pipe(select(UsersSelectors.error));

  statistics$ = this.store.pipe(select(UsersSelectors.selectStatistics));

  constructor(private store: Store<UsersPartialState>) {}

  loadAll() {
    this.store.dispatch(UsersActions.loadAll());
    this.store.dispatch(UsersActions.loadStatistics());
  }

  addUser(data: IUser) {
    this.store.dispatch(UsersActions.addUser({ data }));
  }
}
