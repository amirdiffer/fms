import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { OwnershipActions } from './ownership.actions';
import { OwnershipService } from './ownership.service';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class OwnershipEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(OwnershipActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            this._tableFacade.initialPaginator(data.resultNumber, 'ownership');
            return OwnershipActions.allDataLoaded({ data: data.message })
          }),
          catchError((error) => of(OwnershipActions.error({ reason: error })))
        )
      )
    )
  );

  addOwnership$ = createEffect(() =>
    this.action$.pipe(
      ofType(OwnershipActions.addOwnership),
      mergeMap((action) =>
        this.service.addOwnership(action.data).pipe(
          map((data) =>
            OwnershipActions.ownershipAddedSuccessfully({ data: { ...action.data, ...data.message } })
          ),
          catchError((error) => of(OwnershipActions.error({ reason: error })))
        )
      )
    )
  );

  editOwnership$ = createEffect(() =>
    this.action$.pipe(
      ofType(OwnershipActions.editOwnership),
      mergeMap((action) =>
        this.service.editOwnership(action.data).pipe(
          map((data) =>
            OwnershipActions.ownershipEditedSuccessfully()
          ),
          catchError((error) => of(OwnershipActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(private action$: Actions, private service: OwnershipService, private _tableFacade: TableFacade) { }
}
