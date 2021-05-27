import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { OperatorMovementHistoryActions } from './operator-movement-history.actions';
import { OperatorMovementHistoryService } from './operator-movement-history.service';
import { TableFacade } from '@core/table/+state/table.facade';
import { Store } from '@ngrx/store';

@Injectable()
export class OperatorMovementHistoryEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(OperatorMovementHistoryActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll(action.id).pipe(
          map((data) => {
            this.store.dispatch(OperatorMovementHistoryActions.count({ data: data.resultNumber }));
            return OperatorMovementHistoryActions.allDataLoaded({ data: data.message });
          }),
          catchError((error) => of(OperatorMovementHistoryActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private store: Store,
    private service: OperatorMovementHistoryService,
    private _tableFacade: TableFacade
  ) {}
}

