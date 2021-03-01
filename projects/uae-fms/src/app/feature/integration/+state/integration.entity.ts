import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IIntegration } from '@models/integration';

export const INTEGRATION_FEATURE_KEY = 'integration';

export interface IntegrationState extends EntityState<IIntegration> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface IntegrationPartialState {
  [INTEGRATION_FEATURE_KEY]: IntegrationState;
}

export const integrationAdapter: EntityAdapter<IIntegration> = createEntityAdapter<
  IIntegration
>();

export const initialState: IntegrationState = integrationAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as IntegrationState
);
