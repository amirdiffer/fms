import { createAction, props } from '@ngrx/store';
import { MovementOverviewStateModel } from './movement-overview.entity';

export class MovementOverviewActionsTemporary {
  static loadAll = createAction(
    '[MovementOverviewTemporary] load all overviews'
  );

  static allDataLoaded = createAction(
    '[MovementOverviewTemporary] all data are loaded',
    props<{ data: MovementOverviewStateModel[] }>()
  );

  static count = createAction(
    '[MovementOverviewTemporary] get result number',
    props<{ data: number }>()
  );

  static error = createAction(
    '[MovementOverviewTemporary] error occurred',
    props<{ reason: any }>()
  );
}
