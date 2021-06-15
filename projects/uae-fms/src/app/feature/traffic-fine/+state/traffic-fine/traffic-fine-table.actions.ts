import { createAction, props } from '@ngrx/store';
import { ITrafficFine } from '@models/traffic-fine';
import { ITrafficFineStatistics } from '@models/statistics';
import { IGetVehicleInfoByChassisNumber, IGetVehicleInfoByPlateNumber } from './traffic-fine-table.entity';
import { ITrafficFineVehicleInfo } from '@models/pending-registration.model';

export class TrafficFineTableActions {
  static loadAll = createAction('[TrafficFineTable] load all data');

  static allDataLoaded = createAction(
    '[TrafficFineTable] all datas are loaded',
    props<{ data: ITrafficFine[] }>()
  );

  static loadStatistics = createAction(
    '[TrafficFineTable] load all statistics'
  );

  static statisticsLoaded = createAction(
    '[TrafficFineTable] all statistics are loaded',
    props<{ data: ITrafficFineStatistics }>()
  );

  static error = createAction(
    '[TrafficFineTable] error occurred',
    props<{ reason: any }>()
  );


   /* Get Vehicle Information by plate number */
  static getVehicleInformationByPlateNumber = createAction(
    '[TrafficFineTable] get information vehicle by plate number',
    props<{ data: IGetVehicleInfoByPlateNumber }>()
  );

  static vehicleInformationByPlateNumberLoadedSuccessfully = createAction(
    '[TrafficFineTable] vehicle information by plate number loaded successfully ',
    props<{ data: ITrafficFineVehicleInfo }>()
  );

  /* Get Vehicle Information by chassis number */
  static getVehicleInformationByChassisNumber = createAction(
    '[TrafficFineTable] get information vehicle by chassis number',
    props<{ data: IGetVehicleInfoByChassisNumber }>()
  );

  static vehicleInformationByChassisNumberLoadedSuccessfully = createAction(
    '[TrafficFineTable] vehicle information by chassis number loaded successfully ',
    props<{ data: ITrafficFineVehicleInfo }>()
  );


  static reset = createAction(
    '[TrafficFineTable] reset parameters'
  );
}
