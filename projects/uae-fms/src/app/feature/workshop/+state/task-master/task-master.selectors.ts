import { createSelector } from '@ngrx/store';
import { WorkshopSelectors } from '../workshop.selectors';
import { taskMasterAdapter } from './task-master.entity';

const { selectAll } = taskMasterAdapter.getSelectors();

export class TaskMasterSelectors {
  static selectAll = createSelector(
    WorkshopSelectors.taskMasterSelector,
    selectAll
  );

  static message = createSelector(
    WorkshopSelectors.taskMasterSelector,
    (state) => state.message
  );

  static error = createSelector(
    WorkshopSelectors.taskMasterSelector,
    (state) => state.error
  );

  static submitted = createSelector(
    WorkshopSelectors.taskMasterSelector,
    (state) => state.submitted
  );
}
