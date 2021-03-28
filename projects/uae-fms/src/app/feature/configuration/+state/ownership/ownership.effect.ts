import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { OwnershipActions } from './ownership.actions';
import { OwnershipService } from './ownership.service';

@Injectable()
export class OwnershipEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(OwnershipActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => OwnershipActions.allDataLoaded({ data: data.message })),
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
            OwnershipActions.ownershipAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
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
        this.service.addOwnership(action.data).pipe(
          map((data) =>
            OwnershipActions.ownershipEditedSuccessfully({ data: data.message })
          ),
          catchError((error) => of(OwnershipActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(private action$: Actions, private service: OwnershipService) {}
}
