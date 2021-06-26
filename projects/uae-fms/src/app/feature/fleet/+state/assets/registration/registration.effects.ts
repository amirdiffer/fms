import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { RegistrationActions } from './registration.actions';
import { RegistrationService } from './registration.service';
import { TableFacade } from '@core/table/+state/table.facade';
import { Store } from '@ngrx/store';

@Injectable()
export class RegistrationEffects {
  constructor(
    private action$: Actions,
    private service: RegistrationService,
    private _tableFacade: TableFacade,
    private _store: Store
  ) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(RegistrationActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            this._tableFacade.initialPaginator(
              data.resultNumber,
              'asset_registration'
            );
            this._store.dispatch(
              RegistrationActions.count({ data: data.resultNumber })
            );
            return RegistrationActions.allDataLoaded({ data: data.message });
          }),
          catchError((error) =>
            of(RegistrationActions.error({ reason: error }))
          )
        )
      )
    )
  );
  register$ = createEffect(() =>
    this.action$.pipe(
      ofType(RegistrationActions.registerAsset),
      mergeMap((action) =>
        this.service.registerAsset(action.data).pipe(
          map((data) =>
            RegistrationActions.assetRegisterSuccessfull({ data: action.data })
          ),
          catchError((error) =>
            of(RegistrationActions.error({ reason: error }))
          )
        )
      )
    )
  );

  getAssetForRegistrationByassetId = createEffect(() =>
    this.action$.pipe(
      ofType(RegistrationActions.loadAssetForRegistrationByAssetId),
      mergeMap((action) =>
        this.service.getAssetForRegistrationByAssetId(action.assetId).pipe(
          map((data) => {
            return RegistrationActions.AssetForRegistrationByAssetIdLoaded({
              data: data.message
            });
          }),
          catchError((error) =>
            of(RegistrationActions.error({ reason: error }))
          )
        )
      )
    )
  );

  /* Register an Asset by plate number */
  registerByPlateNumber$ = createEffect(() =>
    this.action$.pipe(
      ofType(RegistrationActions.registerAssetByPlateNumber),
      mergeMap((action) =>
        this.service.registerByPlateNumber(action.data).pipe(
          map((data) =>
            RegistrationActions.assetByPlateNumberRegistered({
              data: action.data
            })
          ),
          catchError((error) =>
            of(RegistrationActions.error({ reason: error }))
          )
        )
      )
    )
  );

  /* Register an Asset by chassis number */
  registerByChassisNumber$ = createEffect(() =>
    this.action$.pipe(
      ofType(RegistrationActions.registerAssetByChassisNumber),
      mergeMap((action) =>
        this.service.registerByChasisNumber(action.data).pipe(
          map((data) =>
            RegistrationActions.assetByChassisNumberRegistered({
              data: action.data
            })
          ),
          catchError((error) =>
            of(RegistrationActions.error({ reason: error }))
          )
        )
      )
    )
  );
}
