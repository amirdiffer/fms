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
      ofType(FuelCardsActions.loadFuelCard),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => FuelCardsActions.fuelCardLoaded({ data })),
          catchError((error) => of(FuelCardsActions.fuelCardError({ reason: error })))
        )
      )
    )
  );

  constructor(private action$: Actions, private service: FuelCardsService) {}
}
