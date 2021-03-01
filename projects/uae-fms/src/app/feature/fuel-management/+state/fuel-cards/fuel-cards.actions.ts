import { IFuelManagementFuelCard } from '@models/fuel-management';
import { createAction, props } from '@ngrx/store';

export class FuelCardsActions {
  static loadFuelCard = createAction('[FuelCards] load all data');

  static fuelCardLoaded = createAction(
    '[FuelCards] all datas are loaded',
    props<{ data: IFuelManagementFuelCard[] }>()
  );

  static fuelCardError = createAction(
    '[FuelCards] error occurred',
    props<{ reason: any }>()
  );
}
