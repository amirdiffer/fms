import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FuelCardsActions } from './fuel-cards.actions';
import { FuelCardsService } from './fuel-cards.service';

@Injectable()
export class FuelCardsEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(FuelCardsActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => FuelCardsActions.allDataLoaded({ data })),
          catchError((error) => of(FuelCardsActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(private action$: Actions, private service: FuelCardsService) {}
}
