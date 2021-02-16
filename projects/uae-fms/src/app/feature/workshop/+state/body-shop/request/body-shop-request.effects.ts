import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BodyShopRequestActions } from './body-shop-request.actions';
import { BodyShopRequestService } from './body-shop-request.service';

@Injectable()
export class BodyShopRequestEffect {
  constructor(private action$: Actions, private service: BodyShopRequestService) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(BodyShopRequestActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            return BodyShopRequestActions.allDataLoaded({ data });
          }),
          catchError((error) => of(BodyShopRequestActions.error({ reason: error })))
        )
      )
    )
  );
}
