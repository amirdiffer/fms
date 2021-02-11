import { Injectable } from '@angular/core';
import { TaskMasterService } from './task-master.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { TaskMasterActions } from './task-master.actions';

@Injectable()
export class TaskMasterEffect {
  constructor(private action$: Actions, private service: TaskMasterService) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(TaskMasterActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            return TaskMasterActions.allDataLoaded({ data });
          }),
          catchError((error) => of(TaskMasterActions.error({ reason: error })))
        )
      )
    )
  );
}
