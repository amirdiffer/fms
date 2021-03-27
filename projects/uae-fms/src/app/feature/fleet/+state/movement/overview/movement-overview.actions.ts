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

  static addMovementRequest = createAction(
    '[MovementOverview] add Movement Request',
    props<{ data: any }>()
  );

  static movementRequestAddedSuccessfully = createAction(
    '[MovementOverview] Movement Request added successfully',
    props<{ data: any }>()
  );

  static editMovementRequest = createAction(
    '[MovementOverview] edit Movement Request',
    props<{ data: any }>()
  );

  static movementRequestEditedSuccessfully = createAction(
    '[MovementOverview] Movement Request added successfully',
    props<{ data: MovementOverviewStateModel }>()
  );

}
