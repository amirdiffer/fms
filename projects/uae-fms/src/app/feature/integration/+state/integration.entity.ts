import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const INTEGRATION_FEATURE_KEY = 'integration';

export interface IntegrationStateModel {
  integrationName: string;
  type: string;
  gpr: string;
  status: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  supportOperator: string;
}

export interface IntegrationState extends EntityState<IntegrationStateModel> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface IntegrationPartialState {
  [INTEGRATION_FEATURE_KEY]: IntegrationState;
}

export const integrationAdapter: EntityAdapter<IntegrationStateModel> = createEntityAdapter<
  IntegrationStateModel
>();

export const initialState: IntegrationState = integrationAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as IntegrationState
);
