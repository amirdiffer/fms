import { IOrganization } from '@models/organization';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const FLEET_ORGANIZATION_FEATURE_KEY = 'organization';

export interface OrganizationState extends EntityState<IOrganization> {
  error?: any;
  loaded: boolean;
  message: string;
  resultNumber?: number;
  submitted?: boolean,
}

export interface OrganizationPartialState {
  [FLEET_ORGANIZATION_FEATURE_KEY]: OrganizationState;
}

export const organizationAdapter: EntityAdapter<IOrganization> = createEntityAdapter<
  IOrganization
>();

export const initialState: OrganizationState = organizationAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    submitted: false,
    error: null,
    resultNumber: 0
  } as OrganizationState
);
