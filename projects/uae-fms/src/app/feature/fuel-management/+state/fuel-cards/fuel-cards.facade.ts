import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FuelCardsSelectors } from './fuel-cards.selectors';
import { FuelCardsActions } from './fuel-cards.actions';
import { FuelCardsPartialState } from './fuel-cards.entity';
import { IFuelManagementFuelCard } from '@models/fuel-management';

@Injectable()
export class FuelCardsFacade {
  fuelCards$ = this.store.pipe(select(FuelCardsSelectors.selectAll));
  statistics$ = this.store.pipe(select(FuelCardsSelectors.selectStatistics));
  message$ = this.store.pipe(select(FuelCardsSelectors.message));

  error$ = this.store.pipe(select(FuelCardsSelectors.error));

  constructor(private store: Store<FuelCardsPartialState>) {}

  loadAll() {
    this.store.dispatch(FuelCardsActions.loadFuelCard());
    this.store.dispatch(FuelCardsActions.loadStatistics());
  }
  addFuelCard (data:IFuelManagementFuelCard){
    this.store.dispatch(FuelCardsActions.addFuelCard({data}));
  }
}
