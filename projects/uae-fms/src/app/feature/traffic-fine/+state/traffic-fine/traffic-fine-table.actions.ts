import { createAction, props } from '@ngrx/store';
import { TrafficFineTableStateModel } from './traffic-fine-table.entity';

export class TrafficFineTableActions {
  static loadAll = createAction('[TrafficFineTable] load all data');

  static allDataLoaded = createAction(
    '[TrafficFineTable] all datas are loaded',
    props<{ data: TrafficFineTableStateModel[] }>()
  );

  static error = createAction(
    '[TrafficFineTable] error occurred',
    props<{ reason: any }>()
  );
}
