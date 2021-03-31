import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AssetTypeActions } from './asset-type.actions';
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
        this.service.post(action.data).pipe(
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
        this.service.postMake(action.data).pipe(
          map((data) =>
            AssetTypeActions.makeAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
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
        this.service.postModel(action.data).pipe(
          map((data) =>
            AssetTypeActions.modelAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) => of(AssetTypeActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(private action$: Actions, private service: AssetTypeService) {}
}
