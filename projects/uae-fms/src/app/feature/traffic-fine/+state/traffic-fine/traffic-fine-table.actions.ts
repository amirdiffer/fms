import { createAction, props } from '@ngrx/store';
import { ITrafficFine } from '@models/traffic-fine';

export class TrafficFineTableActions {
  static loadAll = createAction('[TrafficFineTable] load all data');

  static allDataLoaded = createAction(
    '[TrafficFineTable] all datas are loaded',
    props<{ data: ITrafficFine[] }>()
  );

  static error = createAction(
    '[TrafficFineTable] error occurred',
    props<{ reason: any }>()
  );
}
