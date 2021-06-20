import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Store } from "@ngrx/store";
import { AssetSearchThroughService } from "./search-through.service";
import { AssetSearchThroughActions } from "./search-through.actions"
@Injectable()
export class AssetSearchThroughEffects {
  constructor(
    private action$: Actions,
    private service: AssetSearchThroughService,
    private _store: Store
  ) {}

  loadAvailableAsset$ = createEffect(() =>
    this.action$.pipe(ofType(AssetSearchThroughActions.loadAvailableAsset),
      mergeMap((action) =>
        this.service.loadAvailableAsset().pipe(
          map((data) => {
            return AssetSearchThroughActions.allAvailableAsset({ data: data.message });
          }),
          catchError((error) =>
            of(AssetSearchThroughActions.error({ reason: error }))
          )
        )
      )
    )
  );

  loadAvailableAssetForAddingRequest$ = createEffect(() =>
    this.action$.pipe(ofType(AssetSearchThroughActions.loadAvailableAssetForAddingRequest),
      mergeMap((action) =>
        this.service.loadAvailableAssetForAddingRequest().pipe(
          map((data) => {
            return AssetSearchThroughActions.allAvailableAssetForAddingRequestLoaded({ data: data.message });
          }),
          catchError((error) =>
            of(AssetSearchThroughActions.error({ reason: error }))
          )
        )
      )
    )
  );

  loadAvailableAssetForAddingJobCard$ = createEffect(() =>
    this.action$.pipe(ofType(AssetSearchThroughActions.loadAvailableAssetForAddingJobCard),
      mergeMap((action) =>
        this.service.loadAvailableAssetForAddingJobCard().pipe(
          map((data) => {
            return AssetSearchThroughActions.allAvailableAssetForAddingJobCardLoaded({ data: data.message });
          }),
          catchError((error) =>
            of(AssetSearchThroughActions.error({ reason: error }))
          )
        )
      )
    )
  );
}