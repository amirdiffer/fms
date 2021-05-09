import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { PartListService } from './part-list.service';
import { PartListActions } from './part-list.actions';

@Injectable()
export class PartListEffect {
  constructor(private action$: Actions, private service: PartListService) {}

  /* Get All Part of Asset an Sub Asset */

  getAllPartOfAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartListActions.getPartListOfAsset),
      mergeMap((action) =>
        this.service.getPartOfAsset(action.id).pipe(
          map((data) => {
            return PartListActions.partListOfAssetLoaded({ data: data.message });
          }),
          catchError((error) => of(PartListActions.errorAssetPart({ reason: error })))
        )
      )
    )
  );
  getAllPartOfSubAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartListActions.getPartListOfSubAsset),
      mergeMap((action) =>
        this.service.getPartOfSubAsset(action.id).pipe(
          map((data) => {
            return PartListActions.partListOfSubAssetLoaded({ data: data.message });
          }),
          catchError((error) => of(PartListActions.errorSubAssetPart({ reason: error })))
        )
      )
    )
  );


  /* Get Specific Part of Asset an Sub Asset */

  getSpecificPartOfAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartListActions.getSpecificPartOfAsset),
      mergeMap((action) =>
        this.service.getSpecificPartOfAsset(action.id).pipe(
          map((data) => {
            return PartListActions.specificPartOfAssetLoaded({ data: data.message });
          }),
          catchError((error) => of(PartListActions.errorAssetPart({ reason: error })))
        )
      )
    )
  );

  getSpecificPartOfSubAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartListActions.getSpecificPartOfSubAsset),
      mergeMap((action) =>
        this.service.getSpecificPartOfSubAsset(action.id).pipe(
          map((data) => {
            return PartListActions.specificPartOfSubAssetLoaded({ data: data.message });
          }),
          catchError((error) => of(PartListActions.errorSubAssetPart({ reason: error })))
        )
      )
    )
  );


  /* Update Part of Asset an Sub Asset */
  updatePartOfAsset$ = createEffect(() =>
  this.action$.pipe(
      ofType(PartListActions.updatePartOfAsset),
      mergeMap((action) =>
        this.service.updatePartOfAsset(action.data).pipe(
          map((data) =>
              PartListActions.partOfAssetUpdatedSuccessfully({ data: action.data })
          ),
          catchError((error) => of(PartListActions.errorAssetPart({ reason: error })))
        )
      )
    )
  );

  updatePartOfSubAsset$ = createEffect(() =>
  this.action$.pipe(
      ofType(PartListActions.updatePartOfSubAsset),
      mergeMap((action) =>
        this.service.updatePartOfSubAsset(action.data).pipe(
          map((data) =>
              PartListActions.partOfSubAssetUpdatedSuccessfully({ data: action.data })
          ),
          catchError((error) => of(PartListActions.errorSubAssetPart({ reason: error })))
        )
      )
    )
  );
}
