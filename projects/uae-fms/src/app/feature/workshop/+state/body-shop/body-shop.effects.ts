import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BodyShopActions } from './body-shop.actions';
import { BodyShopService } from './body-shop.service';

@Injectable()
export class BodyShopEffect {
  constructor(private action$: Actions, private service: BodyShopService) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(BodyShopActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            return BodyShopActions.allDataLoaded({ data });
          }),
          catchError((error) => of(BodyShopActions.error({ reason: error })))
        )
      )
    )
  );
}
