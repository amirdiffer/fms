import { IOrganization } from '@models/organization';
import { createAction, props } from '@ngrx/store';

export class OrganizationActions {
  static loadAll = createAction('[Organization] load all data');

  static allDataLoaded = createAction(
    '[Organization] all datas are loaded',
    props<{ data: IOrganization[] }>()
  );
  static addOrganization = createAction(
    '[Organization] add organization',
    props<{ data: IOrganization }>()
  );
  static organizationAddedSuccessfully = createAction(
    '[Organization] organization added successfully',
    props<{ data: IOrganization }>()
  )
  static error = createAction(
    '[Organization] error occurred',
    props<{ reason: any }>()
  );
  static reset = createAction(
    '[Organization] parameters are reseted'
  );
}
