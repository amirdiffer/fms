import { createAction, props } from '@ngrx/store';
import { FuelCardsStateModel } from './fuel-cards.entity';

export class FuelCardsActions {
  static loadFuelCard = createAction('[FuelCards] load all data');

  static fuelCardLoaded = createAction(
    '[FuelCards] all datas are loaded',
    props<{ data: FuelCardsStateModel[] }>()
  );

  static fuelCardError = createAction(
    '[FuelCards] error occurred',
    props<{ reason: any }>()
  );
}
