import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ITaskMasterModel {
  name: string;
  timeEstimate: string;
  instruction: string;
  ratePerHour: string;
  skills: TaskMasterSkill[];
  doesNeedParty: boolean;
}

export interface TaskMasterSkill {
  id: number;
  name: string;
}

export interface ITaskMasterState extends EntityState<ITaskMasterModel> {
  error?: any;
  loaded: boolean;
  message: string;
  submitted:boolean;
  skills:any[];
}

export const WORKSHOP_TASK_MASTER_FEATURE_KEY = 'taskMaster';
export interface ITaskMasterPartialState {
  [WORKSHOP_TASK_MASTER_FEATURE_KEY]: ITaskMasterState;
}

export const taskMasterAdapter: EntityAdapter<ITaskMasterModel> = createEntityAdapter<
  ITaskMasterModel
>();

export const initialState: ITaskMasterState = taskMasterAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    error: null,
    submitted:false,
    skills:null
  } as ITaskMasterState
);
