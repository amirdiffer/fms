import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { OperatorTrafficFineActions } from './operator-traffic-fine.actions';
import { OperatorTrafficFineService } from './operator-traffic-fine.service';
import { TableFacade } from '@core/table/+state/table.facade';
import { Store } from '@ngrx/store';

@Injectable()
export class OperatorTrafficFineEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(OperatorTrafficFineActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll(action.id).pipe(
          map((data) => {
            this.store.dispatch(OperatorTrafficFineActions.count({ data: data.resultNumber }));
            return OperatorTrafficFineActions.allDataLoaded({ data: data.message });
          }),
          catchError((error) => of(OperatorTrafficFineActions.error({ reason: error })))
        )
      )
    )
  );

  loadStatistics$ = createEffect(() =>
    this.action$.pipe(
      ofType(OperatorTrafficFineActions.loadStatistics),
      mergeMap((action) =>
        this.service.loadAllStatistics().pipe(
          map((data) => OperatorTrafficFineActions.statisticsLoaded({ data })),
          catchError((error) => of(OperatorTrafficFineActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private store: Store,
    private service: OperatorTrafficFineService,
    private _tableFacade: TableFacade
  ) {}
}

