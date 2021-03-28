import { createAction, props } from '@ngrx/store';
import { OrganizationStateModel } from './organization.entity';

export class OrganizationActions {
  static loadAll = createAction('[Organization] load all data');

  static allDataLoaded = createAction(
    '[Organization] all datas are loaded',
    props<{ data: OrganizationStateModel[] }>()
  );

  static error = createAction(
    '[Organization] error occurred',
    props<{ reason: any }>()
  );
}
