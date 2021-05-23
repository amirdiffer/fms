
import { Injectable } from '@angular/core';
import { TableFacade } from '@core/table/+state/table.facade';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { RequestListActions } from './request-list.actions';
import { RequestListService } from './request-list.service';

@Injectable()
export class RequestListEffect {
  constructor(private action$: Actions, private service: RequestListService , private _tableFacade: TableFacade) {}

   /* '''''Load''''' Requets For Asset and Sub Asset */
  loadRequestPartforAsset$ = createEffect(() =>
   this.action$.pipe(
     ofType(RequestListActions.loadRequestPartforAsset),
     mergeMap((action) =>
       this.service.loadRequestPartOfAsset().pipe(
         map((data) => {
          this._tableFacade.initialPaginator(data.resultNumber, 'part-store-request-list');
           return RequestListActions.allRequestListForAssetLoaded({ data: data.message });
         }),
         catchError((error) => of(RequestListActions.error({ reason: error })))
       )
     )
   )
 );

  loadRequestPartforSubAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(RequestListActions.loadRequestPartforSubAsset),
      mergeMap((action) =>
        this.service.loadRequestPartOfSubAsset().pipe(
          map((data) => {
            this._tableFacade.initialPaginator(data.resultNumber, 'part-store-request-list');
            return RequestListActions.allRequestListForSubAssetLoaded({ data: data.message });
          }),
          catchError((error) => of(RequestListActions.error({ reason: error })))
        )
      )
    )
  );

  

  /* '''''Load''''' statistics of request For Asset and Sub Asset */
  loadStatisticsOfRequestPartforAsset$ = createEffect(() =>
   this.action$.pipe(
     ofType(RequestListActions.loadStatisticsOfRequestPartforAsset),
     mergeMap((action) =>
       this.service.loadStatisticsOfRequestPartOfAsset().pipe(
         map((data) => {
           return RequestListActions.allStatisticsOfRequestListForAssetLoaded({ data: data.message });
         }),
         catchError((error) => of(RequestListActions.error({ reason: error })))
        )
      )
    )
  );

  loadStatisticsOfRequestPartforSubAsset$ = createEffect(() =>
   this.action$.pipe(
     ofType(RequestListActions.loadStatisticsOfRequestPartforSubAsset),
     mergeMap((action) =>
       this.service.loadStatisticsOfRequestPartOfSubAsset().pipe(
         map((data) => {
           return RequestListActions.allStatisticsOfRequestListForSubAssetLoaded({ data: data.message });
         }),
         catchError((error) => of(RequestListActions.error({ reason: error })))
        )
      )
    )
  );



  /* ''''''Add'''''' Requet For Asset and Sub Asset */
  addRequestPartAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(RequestListActions.addRequestPartAsset),
      mergeMap((action) =>
        this.service.addRequestfAsset(action.data).pipe(
          map((data) =>
            RequestListActions.requestOfAssetPartAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) => of(RequestListActions.error({ reason: error })))
        )
      )
    )
  );

  addRequestPartSubAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(RequestListActions.addRequestPartSubAsset),
      mergeMap((action) =>
        this.service.addRequestfSubAsset(action.data).pipe(
          map((data) =>
            RequestListActions.requestOfSubAssetPartAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) => of(RequestListActions.error({ reason: error })))
        )
      )
    )
  );


  /* '''''Get''''' Specific request for asset and sub asset */

  getSpecificRequestPartAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(RequestListActions.getSpecificRequestPartAsset),
      mergeMap((action) =>
        this.service.getSpecificRequestPartOfAsset(action.id).pipe(
          map((data) => {
            return RequestListActions.specificRequestPartOfAssetLoaded({ data: data.message });
          }),
          catchError((error) => of(RequestListActions.error({ reason: error })))
        )
      )
    )
  );

  getSpecificRequestPartSubAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(RequestListActions.getSpecificRequestPartSubAsset),
      mergeMap((action) =>
        this.service.getSpecificRequestPartOfSubAsset(action.id).pipe(
          map((data) => {
            return RequestListActions.specificRequestPartOfSubAssetLoaded({ data: data.message });
          }),
          catchError((error) => of(RequestListActions.error({ reason: error })))
        )
      )
    )
  );




  /* '''''Update''''' Request of Asset and Sub Asset*/
  updateRequestOfAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(RequestListActions.updateRequestOfAsset),
      mergeMap((action) =>
        this.service.updateRequestPartOfAsset(action.data).pipe(
          map((data) =>
            RequestListActions.requestOfAssetUpdatedSuccessfully({ data: action.data })
          ),
          catchError((error) => of(RequestListActions.error({ reason: error })))
        )
      )
    )
  );

  updateRequestOfSubAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(RequestListActions.updateRequestOfSubAsset),
      mergeMap((action) =>
        this.service.updateRequestPartOfSubAsset(action.data).pipe(
          map((data) =>
            RequestListActions.requestOfSubAssetUpdatedSuccessfully({ data: action.data })
          ),
          catchError((error) => of(RequestListActions.error({ reason: error })))
        )
      )
    )
  );



  /* '''''Approve''''' Request of Asset and Sub Asset*/
  approveSpecificRequestPartofAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(RequestListActions.approveSpecificRequestPartofAsset),
      mergeMap((action) =>
        this.service.approveSpecificRequestPartOfAsset(action.id).pipe(
          map((data) => {
            return RequestListActions.specificRequestPartOfAssetApprovedSuccessfully({ data: data.message });
          }),
          catchError((error) => of(RequestListActions.error({ reason: error })))
        )
      )
    )
  );

  approveSpecificRequestPartofSubAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(RequestListActions.approveSpecificRequestPartofSubAsset),
      mergeMap((action) =>
        this.service.approveSpecificRequestPartOfSubAsset(action.id).pipe(
          map((data) => {
            return RequestListActions.specificRequestPartOfSubAssetApprovedSuccessfully({ data: data.message });
          }),
          catchError((error) => of(RequestListActions.error({ reason: error })))
        )
      )
    )
  );



  /* '''''Reject''''' Request of Asset and Sub Asset*/
  rejectSpecificRequestPartofAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(RequestListActions.rejectSpecificRequestPartofAsset),
      mergeMap((action) =>
        this.service.rejectSpecificRequestPartOfAsset(action.id).pipe(
          map((data) => {
            return RequestListActions.specificRequestPartOfAssetRejectedSuccessfully({ data: data.message });
          }),
          catchError((error) => of(RequestListActions.error({ reason: error })))
        )
      )
    )
  );

  rejectSpecificRequestPartofSubAsset$ = createEffect(() =>
    this.action$.pipe(
      ofType(RequestListActions.rejectSpecificRequestPartofSubAsset),
      mergeMap((action) =>
        this.service.rejectSpecificRequestPartOfSubAsset(action.id).pipe(
          map((data) => {
            return RequestListActions.specificRequestPartOfSubAssetRejectedSuccessfully({ data: data.message });
          }),
          catchError((error) => of(RequestListActions.error({ reason: error })))
        )
      )
    )
  );
}
