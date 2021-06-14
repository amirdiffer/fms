import { createSelector } from '@ngrx/store';
import { taskMasterAdapter } from './task-master.entity';

const { selectAll } = taskMasterAdapter.getSelectors();
const taskMasterState = (state) => state['taskMaster'];

export class TaskMasterSelectors {
  static selectAll = createSelector(taskMasterState, selectAll);

  static message = createSelector(taskMasterState, (state) => state.message);

  static error = createSelector(taskMasterState, (state) => state.error);

  static skills = createSelector(taskMasterState, (state) => state.skills);

  static submitted = createSelector(
    taskMasterState,
    (state) => state.submitted
  );
}
