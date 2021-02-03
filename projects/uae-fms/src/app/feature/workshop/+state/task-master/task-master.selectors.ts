import { createSelector } from "@ngrx/store";
import { WorkshopSelectors } from '../workshop.selectors';
import { taskMasterAdapter } from "./task-master.entity";
export class TaskMasterSelectors {
    static selectAll = createSelector(
      WorkshopSelectors.taskMasterSelector,
      taskMasterAdapter.setAll
    );
  
    static message = createSelector(
      WorkshopSelectors.taskMasterSelector,
      (state) => state.message
    );
  
    static error = createSelector(
      WorkshopSelectors.taskMasterSelector,
      (state) => state.error
    );
  }
  