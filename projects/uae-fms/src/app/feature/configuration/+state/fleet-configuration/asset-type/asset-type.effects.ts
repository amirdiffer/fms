import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AssetTypeActions } from './asset-type.action';
import { AssetTypeService } from './asset-type.service';

@Injectable()
export class AssetTypeEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssetTypeActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => AssetTypeActions.allDataLoaded({ data: data.message })),
          catchError((error) => of(AssetTypeActions.error({ reason: error })))
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssetTypeActions.addAssetType),
      mergeMap((action) =>
        this.service.addAssetType(action.data).pipe(
          map((data) =>
            AssetTypeActions.assetTypeAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) => of(AssetTypeActions.error({ reason: error })))
        )
      )
    )
  );

  addMakeData$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssetTypeActions.addMake),
      mergeMap((action) =>
        this.service.addMake(action.data, action.assetId).pipe(
          map((data) =>
            AssetTypeActions.makeAddedSuccessfully({
              data: { ...action.data }
            })
          ),
          catchError((error) => of(AssetTypeActions.error({ reason: error })))
        )
      )
    )
  );


  updateMakeData$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssetTypeActions.updateMake),
      mergeMap((action) =>
        this.service.updateMake(action.data, action.assetId).pipe(
          map((data) =>
            AssetTypeActions.makeUpdatedSuccessfully({ data: action.data })
          ),
          catchError((error) => of(AssetTypeActions.error({ reason: error })))
        )
      )
    )
  );

  updateModelData$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssetTypeActions.updateModel),
      mergeMap((action) =>
        this.service.updateModel(action.data, action.assetId, action.makeId).pipe(
          map((data) =>
            AssetTypeActions.modelUpdatedSuccessfully({ data: action.data })
          ),
          catchError((error) => of(AssetTypeActions.error({ reason: error })))
        )
      )
    )
  );

  updateTrimData$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssetTypeActions.updateTrim),
      mergeMap((action) =>
        this.service.updateTrim(action.data, action.assetId, action.makeId, action.modelId).pipe(
          map((data) =>
            AssetTypeActions.trimUpdatedSuccessfully({ data: action.data })
          ),
          catchError((error) => of(AssetTypeActions.error({ reason: error })))
        )
      )
    )
  );

  addModelData$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssetTypeActions.addModel),
      mergeMap((action) =>
        this.service.addModel(action.data, action.assetId, action.makeId).pipe(
          map((data) =>
            AssetTypeActions.modelAddedSuccessfully({
              data: { ...action.data }
            })
          ),
          catchError((error) => of(AssetTypeActions.error({ reason: error })))
        )
      )
    )
  );

  addTrimData$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssetTypeActions.addTrim),
      mergeMap((action) =>
        this.service.addTrim(action.data, action.assetId, action.makeId, action.modelId).pipe(
          map((data) =>
            AssetTypeActions.trimAddedSuccessfully({
              data: { ...action.data }
            })
          ),
          catchError((error) => of(AssetTypeActions.error({ reason: error })))
        )
      )
    )
  );

  getAssetTypeByID = createEffect(() =>
    this.action$.pipe(
      ofType(AssetTypeActions.assetTypeById),
      mergeMap((action) =>
        this.service.getAssetTypeByID(action.id).pipe(
          map((data) => {
            return AssetTypeActions.assetTypeByIdLoaded({ data: data.message });
          }),
          catchError((error) => of(AssetTypeActions.error({ reason: error })))
        )
      )
    )
  );

  updateAssetType$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssetTypeActions.updateAssetType),
      mergeMap((action) =>
        this.service.updateAssetType(action.data).pipe(
          map((data) =>
          AssetTypeActions.assetTypeUpdated({ data: action.data })
          ),
          catchError((error) => of(AssetTypeActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(private action$: Actions, private service: AssetTypeService) { }
}
