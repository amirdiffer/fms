import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SubAssetTypeService } from "./sub-asset-type.service";
import { SubAssetTypeActions } from './sub-asset-type.actions';


@Injectable()
export class SubAssetTypeEffect {

    loadAll$ = createEffect(() =>
        this.action$.pipe(
            ofType(SubAssetTypeActions.loadAll),
            mergeMap((action) =>
                this.service.loadAll().pipe(
                map((data) => SubAssetTypeActions.allDataLoaded({ data: data.message })),
                catchError((error) => of(SubAssetTypeActions.error({ reason: error })))
                )
            )
        )
    );

    getSubAssetTypeByID = createEffect(() =>
        this.action$.pipe(
        ofType(SubAssetTypeActions.subAssetTypeById),
            mergeMap((action) =>
                this.service.getSubAssetTypeById(action.id).pipe(
                map((data) => {
                    return SubAssetTypeActions.subAssetByIdLoaded({ data: data.message });
                }),
                catchError((error) => of(SubAssetTypeActions.error({ reason: error })))
                )
            )
        )
    );

    updateSubAssetType$ = createEffect(() =>
        this.action$.pipe(
            ofType(SubAssetTypeActions.updateSubAssetType),
            mergeMap((action) =>
                this.service.updateSubAssetType(action.data).pipe(
                map((data) =>
                    SubAssetTypeActions.subAssetTypeUpdatedSuccessfully({ data: action.data })
                ),
                catchError((error) => of(SubAssetTypeActions.error({ reason: error })))
                )
            )
        )
    );


    addSubAssetType$ = createEffect(() =>
        this.action$.pipe(
            ofType(SubAssetTypeActions.addSubAssetType),
            mergeMap((action) =>
                this.service.addSubAssetType(action.data).pipe(
                map((data) =>
                    SubAssetTypeActions.subAssetTypeAddedSuccessfully({
                    data: { ...action.data, ...data.message }
                    })
                ),
                catchError((error) => of(SubAssetTypeActions.error({ reason: error })))
                )
            )
        )
    );

    addMakeData$ = createEffect(() =>
        this.action$.pipe(
        ofType(SubAssetTypeActions.addMake),
            mergeMap((action) =>
                this.service.addMake(action.data, action.subAssetTypeId).pipe(
                map((data) =>
                SubAssetTypeActions.makeAddedSuccessfully({
                    data: { ...action.data }
                    })
                ),
                catchError((error) => of(SubAssetTypeActions.error({ reason: error })))
                )
            )
        )
    );

    updateMakeData$ = createEffect(() =>
      this.action$.pipe(
        ofType(SubAssetTypeActions.updateMake),
        mergeMap((action) =>
          this.service.updateMake(action.data, action.subAssetTypeId).pipe(
            map((data) =>
              SubAssetTypeActions.makeUpdatedSuccessfully({ data: action.data })
            ),
            catchError((error) => of(SubAssetTypeActions.error({ reason: error })))
          )
        )
      )
    );

  addModelData$ = createEffect(() =>
        this.action$.pipe(
            ofType(SubAssetTypeActions.addModel),
            mergeMap((action) =>
                this.service.addModel(action.data, action.subAssetTypeId, action.makeId).pipe(
                map((data) =>
                    SubAssetTypeActions.modelAddedSuccessfully({
                    data: { ...action.data }
                    })
                ),
                catchError((error) => of(SubAssetTypeActions.error({ reason: error })))
                )
            )
        )
    );

  updateModelData$ = createEffect(() =>
    this.action$.pipe(
      ofType(SubAssetTypeActions.updateModel),
      mergeMap((action) =>
        this.service.updateModel(action.data, action.subAssetTypeId, action.makeId).pipe(
          map((data) =>
            SubAssetTypeActions.makeUpdatedSuccessfully({ data: action.data })
          ),
          catchError((error) => of(SubAssetTypeActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(private action$: Actions, private service: SubAssetTypeService) { }
}
