import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { PartListService } from './part-list.service';
import { PartListActions } from './part-list.actions';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class PartListEffect {
  constructor(private action$: Actions, private service: PartListService , private _tableFacade: TableFacade) {}

  /* Get All Accumulated Part of Asset an Sub Asset */
  getAccumulatedAllPartOfAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartListActions.getAccumulatedPartListOfAsset),
      mergeMap((action) =>
        this.service.getAccumulatedPartOfAsset(action.id).pipe(
          map((data) => {
            this._tableFacade.initialPaginator(data.resultNumber, 'asset-accumulated-part-list');
            let newData = data.message.map(
              x=>{return {...x, id: x.itemId}}
            );
            return PartListActions.accumulatedPartListOfAssetLoaded({ data: newData });
          }),
          catchError((error) => of(PartListActions.errorAssetPart({ reason: error })))
        )
      )
    )
  );

  getAccumulatedAllPartOfSubAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartListActions.getAccumulatedPartListOfSubAsset),
      mergeMap((action) =>
        this.service.getAccumulatedPartOfSubAsset(action.id).pipe(
          map((data) => {
            this._tableFacade.initialPaginator(data.resultNumber, 'subasset-accumulated-part-list');
            let newData = data.message.map(
              x=>{return {...x, id: x.itemId}}
            );
            return PartListActions.accumulatedPartListOfSubAssetLoaded({ data: newData });
          }),
          catchError((error) => of(PartListActions.errorAssetPart({ reason: error })))
        )
      )
    )
  );

  /* Get All Part of Asset an Sub Asset */

  getAllPartOfAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartListActions.getPartListOfAsset),
      mergeMap((action) =>
        this.service.getPartListOfAsset(action.id).pipe(
          map((data) => {
            this._tableFacade.initialPaginator(data.resultNumber, 'part-list-item');
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
        this.service.getPartListOfSubAsset(action.id).pipe(
          map((data) => {
            this._tableFacade.initialPaginator(data.resultNumber, 'part-list-item');
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

/* Get Statistics Part of Asset an Sub Asset */
  getStatisticsPartOfAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartListActions.getStatisticPartListOfAsset),
      mergeMap((action) =>
        this.service.getStatisticsPartOfAsset(action.id).pipe(
          map((data) => {
            return PartListActions.statisticPartListOfAssetLoaded({ data: data.message });
          }),
          catchError((error) => of(PartListActions.errorAssetPart({ reason: error })))
        )
      )
    )
  );

  getStatisticsPartOfSubAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(PartListActions.getSpecificPartOfSubAsset),
      mergeMap((action) =>
        this.service.getStatisticsPartOfSubAsset(action.id).pipe(
          map((data) => {
            return PartListActions.statisticPartListOfSubAssetLoaded({ data: data.message });
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
