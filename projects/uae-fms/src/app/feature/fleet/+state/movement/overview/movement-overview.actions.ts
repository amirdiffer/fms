import { createAction, props } from '@ngrx/store';
import { MovementOverviewStateModel } from './movement-overview.entity';

export class MovementOverviewActions {
  static loadAll = createAction('[MovementOverview] load all overviews');

  static allDataLoaded = createAction(
    '[MovementOverview] all data are loaded',
    props<{ data: MovementOverviewStateModel[] }>()
  );

  static error = createAction(
    '[MovementOverview] error occurred',
    props<{ reason: any }>()
  );

  static count = createAction(
    '[MovementOverview] get result number',
    props<{ data: number }>()
  );

}
