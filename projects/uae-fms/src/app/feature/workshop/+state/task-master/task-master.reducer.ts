import {
  initialState,
  ITaskMasterState,
  taskMasterAdapter
} from './task-master.entity';
import { Action, createReducer, on } from '@ngrx/store';
import { TaskMasterActions } from './task-master.actions';

const taskMasterReducer = createReducer(
  initialState,
  on(TaskMasterActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(TaskMasterActions.allDataLoaded, (state, { data }) =>
    taskMasterAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(TaskMasterActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),
  on(TaskMasterActions.resetParams, (state) => ({
    ...state,
    error: null,
    submitted: false
  })),
  on(TaskMasterActions.addTaskMaster, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null,
    submitted: false
  })),
  on(TaskMasterActions.loadAllSkill, (state) => ({
    ...state,
    loaded: false,
    skills: null,
    error: null,
  })),
  on(TaskMasterActions.allSkillLoaded, (state, { data }) =>
    taskMasterAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null,
      skills: data
    })
  ),
  on(TaskMasterActions.taskMasterAddedSuccessfully, (state, { data }) => ({
    ...state,
    submitted: true
  })),
  on(TaskMasterActions.editTaskMaster, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(TaskMasterActions.taskMasterEditedSuccessfully, (state, { data }) =>
  ({
    ...state,
    error: null,
    message: null,
    submitted: true
  })
  ),
);

export function reducer(state: ITaskMasterState, action: Action) {
  return taskMasterReducer(state, action);
}
