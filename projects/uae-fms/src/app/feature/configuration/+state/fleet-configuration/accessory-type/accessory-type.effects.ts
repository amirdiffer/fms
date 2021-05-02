import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AccessoryTypeService } from './accessory-type.service';
import { AccessoryTypeActions } from './accessory-type.actions';


@Injectable()
export class AccessoryTypeEffect {

    loadAll$ = createEffect(() =>
        this.action$.pipe(
            ofType(AccessoryTypeActions.loadAll),
            mergeMap((action) =>
                this.service.loadAll().pipe(
                map((data) => AccessoryTypeActions.allDataLoaded({ data: data.message })),
                catchError((error) => of(AccessoryTypeActions.error({ reason: error })))
                )
            )
        )
    );

    addAccessoryType$ = createEffect(() =>
    this.action$.pipe(
      ofType(AccessoryTypeActions.addAccessoryType),
      mergeMap((action) =>
        this.service.addAccessoryType(action.data).pipe(
          map((data) =>
          AccessoryTypeActions.accessoryTypeAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) => of(AccessoryTypeActions.error({ reason: error })))
        )
      )
    )
  );


  updateAccessoryType$ = createEffect(() =>
    this.action$.pipe(
      ofType(AccessoryTypeActions.updateAccessoryType),
      mergeMap((action) =>
        this.service.updateAccessoryType(action.data).pipe(
          map((data) =>
          AccessoryTypeActions.accessoryUpdatedSuccessfully({ data: action.data })
          ),
          catchError((error) => of(AccessoryTypeActions.error({ reason: error })))
        )
      )
    )
  );

  getAccessoryTypeByID = createEffect(() =>
    this.action$.pipe(
      ofType(AccessoryTypeActions.accessoryTypeById),
      mergeMap((action) =>
        this.service.getAccessoryTypeByID(action.id).pipe(
          map((data) => {
            return AccessoryTypeActions.accessoryTypeByIdLoaded({ data: data.message });
          }),
          catchError((error) => of(AccessoryTypeActions.error({ reason: error })))
        )
      )
    )
  );
  


  constructor(private action$: Actions, private service: AccessoryTypeService) { }
}