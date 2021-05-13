import { RequestListService } from '@feature/part-store/+state/order-list/request-list/request-list.service';
import { RequestListActions } from '@feature/part-store/+state/order-list/request-list/request-list.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class RequestListEffect {
  constructor(private action$: Actions, private service: RequestListService) {}

  loadAllAssetRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(RequestListActions.loadAllAssetRequest),
      mergeMap((action) =>
        this.service.loadAllAssetRequest().pipe(
          map((data) => {
            return RequestListActions.allAssetRequestsLoaded({ data: data.message });
          }),
          catchError((error) => of(RequestListActions.error({ reason: error })))
        )
      )
    )
  );

  loadAllSubAssetRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(RequestListActions.loadAllSubAssetRequest),
      mergeMap((action) =>
        this.service.loadAllSubAssetRequest().pipe(
          map((data) => {
            return RequestListActions.allSubAssetRequestsLoaded({ data: data.message });
          }),
          catchError((error) => of(RequestListActions.error({ reason: error })))
        )
      )
    )
  );
}
