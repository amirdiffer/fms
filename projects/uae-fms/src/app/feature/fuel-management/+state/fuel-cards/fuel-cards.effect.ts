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
          map((data) =>
            FuelCardsActions.fuelCardLoaded({ data: data.message })
          ),
          catchError((error) =>
            of(FuelCardsActions.fuelCardError({ reason: error }))
          )
        )
      )
    )
  );
  loadStatistics$ = createEffect(() =>
    this.action$.pipe(
      ofType(FuelCardsActions.loadStatistics),
      mergeMap((action) =>
        this.service.loadAllStatistics().pipe(
          map((data) =>
            FuelCardsActions.statisticsLoaded({ data: data.message })
          ),
          catchError((error) =>
            of(FuelCardsActions.fuelCardError({ reason: error }))
          )
        )
      )
    )
  );

  addFuelCard$ = createEffect(() =>
    this.action$.pipe(
      ofType(FuelCardsActions.addFuelCard),
      mergeMap((action) =>
        this.service.addFuelCard(action.data).pipe(
          map((data) =>
            FuelCardsActions.addFuelCardSuccessfully({ data: data.message })
          ),
          catchError((error) =>
            of(FuelCardsActions.fuelCardError({ reason: error }))
          )
        )
      )
    )
  );

  constructor(private action$: Actions, private service: FuelCardsService) {}
}
