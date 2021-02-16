import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { SuppliersService } from '@feature/part-store/+state/order-list/suppliers/suppliers.service';
import { SuppliersActions } from '@feature/part-store/+state/order-list/suppliers/suppliers.actions';

@Injectable()
export class SuppliersEffects {
  constructor(private action$: Actions, private service: SuppliersService) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(SuppliersActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            return SuppliersActions.allDataLoaded({ data });
          }),
          catchError((error) => of(SuppliersActions.error({ reason: error })))
        )
      )
    )
  );
}
