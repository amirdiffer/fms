import { IFuelManagementFuelCard  } from '@models/fuel-management';
import { IFuelManagementStatistics } from '@models/statistics';
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
  static loadStatistics = createAction('[FuelCards] load all statistics');
  static statisticsLoaded = createAction(
    '[FuelCards] all statistics are loaded',
    props<{ data : IFuelManagementStatistics}>()
  );
  static addFuelCard = createAction(
    '[FuelCards] add fuel card',
    props<{data:IFuelManagementFuelCard}>()
  );
  static addFuelCardSuccessfully = createAction(
    '[FuelCards] fuel card added successfully',
    props<{data:IFuelManagementFuelCard}>()
  );
}
