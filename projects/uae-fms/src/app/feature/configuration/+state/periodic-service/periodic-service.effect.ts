import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PeriodicServiceActions } from './periodic-service.actions';
import { PeriodicServiceService } from './periodic-service.service';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class PeriodicServiceEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(PeriodicServiceActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            this._tableFacade.initialPaginator(data.resultNumber, 'periodic-service');
            return PeriodicServiceActions.allDataLoaded({ data: data.message });
          }),
          catchError((error) =>
            of(PeriodicServiceActions.error({ reason: error }))
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.action$.pipe(
      ofType(PeriodicServiceActions.addPeriodicService),
      mergeMap((action) =>
        this.service.post(action.data).pipe(
          map((data) =>
            PeriodicServiceActions.periodicServiceAddedSuccessfully({
              data: data.message
            })
          ),
          catchError((error) =>
            of(PeriodicServiceActions.error({ reason: error }))
          )
        )
      )
    )
  );

  editData$ = createEffect(() =>
    this.action$.pipe(
      ofType(PeriodicServiceActions.editPeriodicService),
      mergeMap((action) =>
        this.service.update(action.data).pipe(
          map((data) =>
            PeriodicServiceActions.periodicServiceEditedSuccessfully({
              data: data.message
            })
          ),
          catchError((error) =>
            of(PeriodicServiceActions.error({ reason: error }))
          )
        )
      )
    )
  );

  specificPeriodicService$ = createEffect(() =>
    this.action$.pipe(
      ofType(PeriodicServiceActions.getPeriodicServiceById),
      mergeMap((action) =>
        this.service.getById(action.id).pipe(
          map((data) => {
            return PeriodicServiceActions.periodicServiceByIdLoaded({ data: data.message });
          }),
          catchError((error) => of(PeriodicServiceActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private service: PeriodicServiceService,
    private _tableFacade: TableFacade
  ) {}
}
