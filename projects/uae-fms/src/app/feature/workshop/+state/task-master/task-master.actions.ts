import { createAction, props } from '@ngrx/store';
import { ITaskMasterModel } from './task-master.entity';

export class TaskMasterActions {
  static loadAll = createAction('[TaskMaster] load all data');

  static allDataLoaded = createAction(
    '[TaskMaster] all datas are loaded',
    props<{ data: ITaskMasterModel[] }>()
  );

  static error = createAction(
    '[TaskMaster] error occurred',
    props<{ reason: any }>()
  );

  static addTaskMaster = createAction(
    '[TaskMaster] add task master',
    props<{ data: any }>()
  );

  static taskMasterAddedSuccessfully = createAction(
    '[TaskMaster] task master added successfully',
    props<{ data: ITaskMasterModel }>()
  );

  static editTaskMaster = createAction(
    '[TaskMaster] edit task master',
    props<{ data: any }>()
  );

  static taskMasterEditedSuccessfully = createAction(
    '[TaskMaster] task master edited successfully',
    props<{ data: ITaskMasterModel }>()
  );

  static resetParams = createAction('[Users] Reset Parameters');
}
