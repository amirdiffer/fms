import { createAction, props } from '@ngrx/store';
import { FuelCardsStateModel } from './fuel-cards.entity';

export class FuelCardsActions {
  static loadAll = createAction('[FuelCards] load all data');

  static allDataLoaded = createAction(
    '[FuelCards] all datas are loaded',
    props<{ data: FuelCardsStateModel[] }>()
  );

  static error = createAction(
    '[FuelCards] error occurred',
    props<{ reason: any }>()
  );
}
