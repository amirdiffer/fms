import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FuelCardsSelectors } from './fuel-cards.selectors';
import { FuelCardsActions } from './fuel-cards.actions';
import { FuelCardsPartialState } from './fuel-cards.entity';

@Injectable()
export class FuelCardsFacade {
  fuelCards$ = this.store.pipe(select(FuelCardsSelectors.selectAll));

  message$ = this.store.pipe(select(FuelCardsSelectors.message));

  error$ = this.store.pipe(select(FuelCardsSelectors.error));

  constructor(private store: Store<FuelCardsPartialState>) {}

  loadAll() {
    this.store.dispatch(FuelCardsActions.loadAll());
  }
}
