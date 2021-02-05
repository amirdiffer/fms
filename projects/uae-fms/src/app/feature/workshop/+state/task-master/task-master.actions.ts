import { createAction, props } from "@ngrx/store";
import { ITaskMasterModel } from "./task-master.entity";


export class TaskMasterActions {
  static loadAll = createAction(
    "[TaskMaster] load all data"
  );

  static allDataLoaded = createAction(
    "[TaskMaster] all datas are loaded",
    props<{ data: ITaskMasterModel[] }>()
  );

  static error = createAction(
    "[TaskMaster] error occurred",
    props<{ reason: any }>()
  )
}
