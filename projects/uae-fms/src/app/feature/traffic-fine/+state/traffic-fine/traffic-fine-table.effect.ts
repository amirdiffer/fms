import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TrafficFineTableActions } from './traffic-fine-table.actions';
import { TrafficFineTableService } from './traffic-fine-table.service';

@Injectable()
export class TrafficFineTableEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(TrafficFineTableActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => TrafficFineTableActions.allDataLoaded({ data })),
          catchError((error) =>
            of(TrafficFineTableActions.error({ reason: error }))
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private service: TrafficFineTableService
  ) {}
}