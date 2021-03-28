import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const FLEET_ORGANIZATION_FEATURE_KEY = 'organization';

export interface OrganizationStateModel {
  organization: string;
  section: string;
  location: string;
  tfPaid: string;
  tfUnpaid: string;
  peopleNumber: string;
  carsNumber: string;
}

export interface OrganizationState extends EntityState<OrganizationStateModel> {
  error?: any;
  loaded: boolean;
  message: string;
}

export interface OrganizationPartialState {
  [FLEET_ORGANIZATION_FEATURE_KEY]: OrganizationState;
}

export const organizationAdapter: EntityAdapter<OrganizationStateModel> = createEntityAdapter<
  OrganizationStateModel
>();

export const initialState: OrganizationState = organizationAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    error: null
  } as OrganizationState
);
