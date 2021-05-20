import { createAction, props } from '@ngrx/store';

export class RequestListActions {

  static loadAllAssetRequest = createAction('[RequestList] load all asset request data');

  static allAssetRequestsLoaded = createAction(
    '[RequestList] all asset requests are loaded',
    props<{ data: any[] }>()
  );

  static loadAllSubAssetRequest = createAction('[RequestList] load all sub asset request data');

  static allSubAssetRequestsLoaded = createAction(
    '[RequestList] all sub asset requests are loaded',
    props<{ data: any[] }>()
  );

  static error = createAction(
    '[RequestList] error occurred',
    props<{ reason: any }>()
  );
}
