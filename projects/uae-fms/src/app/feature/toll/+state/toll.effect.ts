import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Observable, observable, of, pipe } from 'rxjs';
import { TollActions } from './toll.actions';
import { TollService } from './toll.service';

@Injectable()
export class TollEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(TollActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => TollActions.allDataLoaded({ data : data.message})),
          catchError((error) => of(TollActions.error({ reason: error })))
        )
      )
    )
  );
  loadStatistic$ = createEffect(() =>
  this.action$.pipe(
    ofType(TollActions.loadStatistic),
    mergeMap((action) =>
      this.service.loadStatistic().pipe(
        map((data) => TollActions.statisticLoaded({ data: data.message})),
        catchError((error) => of(TollActions.error({ reason: error })))
      )
    )
  )
);

  assignNow$ = createEffect(() =>
    this.action$.pipe(
        ofType(TollActions.loadAssignNow),
        map((data) => TollActions.assignNowLoaded({ data })
      )
    )
  );

  constructor(private action$: Actions, private service: TollService) {}
}
