import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TaskMasterActions } from './task-master.actions';
import { ITaskMasterPartialState } from './task-master.entity';
import { TaskMasterSelectors } from './task-master.selectors';

@Injectable()
export class TaskMasterFacade {
  bodyShop$ = this.store.pipe(select(TaskMasterSelectors.selectAll));

  message$ = this.store.pipe(select(TaskMasterSelectors.message));

  error$ = this.store.pipe(select(TaskMasterSelectors.error));

  constructor(private store: Store<ITaskMasterPartialState>) {}

  loadAll() {
    this.store.dispatch(TaskMasterActions.loadAll());
  }
}
