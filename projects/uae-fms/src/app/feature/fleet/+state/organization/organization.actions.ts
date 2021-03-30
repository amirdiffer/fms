import { IOrganization } from '@models/organization';
import { createAction, props } from '@ngrx/store';

export class OrganizationActions {
  static loadAll = createAction('[Organization] load all data');

  static allDataLoaded = createAction(
    '[Organization] all datas are loaded',
    props<{ data: IOrganization[] }>()
  );

  static error = createAction(
    '[Organization] error occurred',
    props<{ reason: any }>()
  );
}
