import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TaskMasterActions } from './task-master.actions';
import { ITaskMasterPartialState } from './task-master.entity';
import { TaskMasterSelectors } from './task-master.selectors';

@Injectable()
export class TaskMasterFacade {
  taskMasters$ = this.store.pipe(select(TaskMasterSelectors.selectAll));

  message$ = this.store.pipe(select(TaskMasterSelectors.message));

  error$ = this.store.pipe(select(TaskMasterSelectors.error));

  submitted$ = this.store.pipe(select(TaskMasterSelectors.submitted));

  skills$ = this.store.pipe(select(TaskMasterSelectors.skills));

  constructor(private store: Store<ITaskMasterPartialState>) {this.loadAll()}

  loadAll() {
    this.store.dispatch(TaskMasterActions.loadAll());
  }

  addTaskMaster(data: any) {
    this.store.dispatch(TaskMasterActions.addTaskMaster({ data }));
  }

  editTaskMaster(data: any) {
    this.store.dispatch(TaskMasterActions.editTaskMaster({ data }));
  }

  loadAllSkill (){
    this.store.dispatch(TaskMasterActions.loadAllSkill());
  }
  reset() {
    this.store.dispatch(TaskMasterActions.resetParams());
  }
}
