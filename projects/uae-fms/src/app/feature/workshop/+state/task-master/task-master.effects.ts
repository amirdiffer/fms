import { Injectable } from '@angular/core';
import { TaskMasterService } from './task-master.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { TaskMasterActions } from './task-master.actions';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class TaskMasterEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(TaskMasterActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data: any) => {
            this._tableFacade.initialPaginator(data.resultNumber, 'taskmaster');
            return TaskMasterActions.allDataLoaded({ data: data.message });
          }),
          catchError((error) => of(TaskMasterActions.error({ reason: error })))
        )
      )
    )
  );

  addTaskMaster$ = createEffect(() =>
    this.action$.pipe(
      ofType(TaskMasterActions.addTaskMaster),
      mergeMap((action) =>
        this.service.addTaskMaster(action.data).pipe(
          map((data) =>
            TaskMasterActions.taskMasterAddedSuccessfully({
              data: data.message
            })
          ),
          catchError((error) => of(TaskMasterActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(private action$: Actions, private service: TaskMasterService, private _tableFacade: TableFacade) {}
}
