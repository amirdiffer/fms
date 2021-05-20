import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { PartMasterActions } from './part-master.actions';
import { PartMasterService } from './part-master.service';

@Injectable()
export class PartMasterEffect {
  constructor(private action$: Actions, private service: PartMasterService) {}

  /* GET CATEGORIES */
  getCategoryOfAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartMasterActions.getCategoryOfAsset),
      mergeMap((action) =>
        this.service.getCategoryOfAsset(action.id).pipe(
          map((data) => {
            return PartMasterActions.categoryOfAssetLoaded({ data: data.message });
          }),
          catchError((error) => of(PartMasterActions.errorCategory({ reason: error })))
        )
      )
    )
  );

  getCategoryOfSubAsset = createEffect(() =>
    this.action$.pipe(
      ofType(PartMasterActions.getCategoryOfSubAsset),
      mergeMap((action) =>
        this.service.getCategoryOfSubAsset(action.id).pipe(
          map((data) => {
            return PartMasterActions.categoryOfSubAssetLoaded({ data: data.message });
          }),
          catchError((error) => of(PartMasterActions.errorCategory({ reason: error })))
        )
      )
    )
  );
  

  /* GET SPECIFIC CATEGORIES */
  getSpecificCategoryOfAsset = createEffect(() =>
    this.action$.pipe(
      ofType(PartMasterActions.getSpecificCategoryOfAsset),
      mergeMap((action) =>
        this.service.getSpecificCategoryOfAsset(action.id).pipe(
          map((data) => {
            return PartMasterActions.specificCategoryOfAssetLoaded({ data: data.message });
          }),
          catchError((error) => of(PartMasterActions.errorCategory({ reason: error })))
        )
      )
    )
  );

  getSpecificCategoryOfSubAsset = createEffect(() =>
    this.action$.pipe(
      ofType(PartMasterActions.getSpecificCategoryOfSubAsset),
      mergeMap((action) =>
        this.service.getSpecificCategoryOfSubAsset(action.id).pipe(
          map((data) => {
            return PartMasterActions.specificCategoryOfSubAssetLoaded({ data: data.message });
          }),
          catchError((error) => of(PartMasterActions.errorCategory({ reason: error })))
        )
      )
    )
  );

  /* ADD CATEGORY ASSET AND SUB ASSET */
  addCategory$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartMasterActions.addCategory),
      mergeMap((action) =>
        this.service.addCategory(action.data).pipe(
          map((data) =>
            PartMasterActions.categoryAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) => of(PartMasterActions.errorCategory({ reason: error })))
        )
      )
    )
  );

  /* UPDATE CATEGORIES */
  updateCategoryOfAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartMasterActions.updateCategoryOfAsset),
      mergeMap((action) =>
        this.service.updateCategoryOfAsset(action.data).pipe(
          map((data) =>
            PartMasterActions.categoryOfAssetUpdatedSuccessfully({ data: action.data })
          ),
          catchError((error) => of(PartMasterActions.errorCategory({ reason: error })))
        )
      )
    )
  );

  updateCategoryOfSubAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartMasterActions.updateCategoryOfSubAsset),
      mergeMap((action) =>
        this.service.updateCategoryOfSubAsset(action.data).pipe(
          map((data) =>
            PartMasterActions.categoryOfSubAssetUpdatedSuccessfully({ data: action.data })
          ),
          catchError((error) => of(PartMasterActions.errorCategory({ reason: error })))
        )
      )
    )
  );


  /* GET ITEMS */
  getItemOfAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartMasterActions.getItemOfAsset),
      mergeMap((action) =>
        this.service.getItemOfAsset(action.id).pipe(
          map((data) => {
            return PartMasterActions.itemOfAssetLoaded({ data: data.message });
          }),
          catchError((error) => of(PartMasterActions.errorItem({ reason: error })))
        )
      )
    )
  );

  getItemOfSubAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartMasterActions.getItemOfSubAsset),
      mergeMap((action) =>
        this.service.getItemOfSubAsset(action.id).pipe(
          map((data) => {
            return PartMasterActions.itemOfSubAssetLoaded({ data: data.message });
          }),
          catchError((error) => of(PartMasterActions.errorItem({ reason: error })))
        )
      )
    )
  );

  /* GET SPECIFIC ITEM */
  getSpecificItemOfAsset = createEffect(() =>
    this.action$.pipe(
      ofType(PartMasterActions.getSpecificItemOfAsset),
      mergeMap((action) =>
        this.service.getSpecificItemOfAsset(action.id).pipe(
          map((data) => {
            return PartMasterActions.specificItemOfAssetLoaded({ data: data.message });
          }),
          catchError((error) => of(PartMasterActions.errorItem({ reason: error })))
        )
      )
    )
  );

  getSpecificItemOfSubAsset = createEffect(() =>
    this.action$.pipe(
      ofType(PartMasterActions.getSpecificItemOfSubAsset),
      mergeMap((action) =>
        this.service.getSpecificItemOfSubAsset(action.id).pipe(
          map((data) => {
            return PartMasterActions.specificItemOfSubAssetLoaded({ data: data.message });
          }),
          catchError((error) => of(PartMasterActions.errorItem({ reason: error })))
        )
      )
    )
  );

  /* ADD ITEMS */
  addItemOfAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartMasterActions.addItemOfAsset),
      mergeMap((action) =>
        this.service.addItemOfAsset(action.data).pipe(
          map((data) =>
            PartMasterActions.itemOfAssetAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) => of(PartMasterActions.errorItem({ reason: error })))
        )
      )
    )
  );

  addItemOfSubAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartMasterActions.addItemOfSubAsset),
      mergeMap((action) =>
        this.service.addItemOfSubAsset(action.data).pipe(
          map((data) =>
            PartMasterActions.itemOfSubAssetAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) => of(PartMasterActions.errorItem({ reason: error })))
        )
      )
    )
  );

  /* UPDATE ITEMS */
  updateItemOfAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartMasterActions.updateItemOfAsset),
      mergeMap((action) =>
        this.service.updateItemOfAsset(action.data).pipe(
          map((data) =>
            PartMasterActions.itemOfAssetUpdatedSuccessfully({ data: action.data })
          ),
          catchError((error) => of(PartMasterActions.errorItem({ reason: error })))
        )
      )
    )
  );
  updateItemOfSubAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartMasterActions.updateItemOfSubAsset),
      mergeMap((action) =>
        this.service.updateItemOfSubAsset(action.data).pipe(
          map((data) =>
            PartMasterActions.itemOfSubAssetUpdatedSuccessfully({ data: action.data })
          ),
          catchError((error) => of(PartMasterActions.errorItem({ reason: error })))
        )
      )
    )
  );
}
