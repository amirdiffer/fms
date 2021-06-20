import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserPorfileAction } from './user.action';
import { UserProfileSelector } from './user.selectors';

@Injectable()
export class UserProfileFacade {
  loadData$ = this._store.select(UserProfileSelector.user);

  loadCalled: boolean = false;

  constructor(private _store: Store) {}

  loadAll() {
    this.loadCalled = true;
    this._store.dispatch(UserPorfileAction.loadData());
  }

  resetParams() {
    this._store.dispatch(UserPorfileAction.resetParams());
  }
}
