import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { SoldListService } from '@feature/workshop/+state/auction-list/sold/sold-list.service';
import { SoldListActions } from '@feature/workshop/+state/auction-list/sold/sold-list.actions';

@Injectable()
export class SoldListEffects {
  constructor(private action$: Actions, private service: SoldListService) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(SoldListActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            return SoldListActions.allDataLoaded({ data });
          }),
          catchError((error) => of(SoldListActions.error({ reason: error })))
        )
      )
    )
  );
}
