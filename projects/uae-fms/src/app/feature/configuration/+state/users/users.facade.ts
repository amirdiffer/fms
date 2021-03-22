import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UsersPartialState } from './users.entity';
import { UsersSelectors } from './users.selectors';
import { UsersActions } from './users.actions';
import { IUser } from '@models/configuration';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class UsersFacade {
  users$ = this.store.pipe(select(UsersSelectors.selectAll));

  message$ = this.store.pipe(select(UsersSelectors.message));

  error$ = this.store.pipe(select(UsersSelectors.error));

  statistics$ = this.store.pipe(select(UsersSelectors.selectStatistics));

  submitted$ = this.store.pipe(select(UsersSelectors.submitted));

  constructor(private store: Store<UsersPartialState>) { }

  loadAll() {
    this.store.dispatch(UsersActions.loadAll());
    this.store.dispatch(UsersActions.loadStatistics());
  }

  addUser(data: any) {
    this.store.dispatch(UsersActions.addUser({ data }));
  }

  editUser(user: any) {
    this.store.dispatch(UsersActions.editUser({ user }));
  }

  getUserById(id: number) {
    return this.store.pipe(select(UsersSelectors.selectById, { id }));
  }
}
