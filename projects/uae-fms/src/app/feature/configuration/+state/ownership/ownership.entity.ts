import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IOwnerShip } from '@models/configuration';

export const CONFIGURATION_OWNERSHIP_FEATURE_KEY = 'ownership';

export interface OwnershipState extends EntityState<IOwnerShip> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface OwnershipPartialState {
  [CONFIGURATION_OWNERSHIP_FEATURE_KEY]: OwnershipState;
}

export const ownershipAdapter: EntityAdapter<IOwnerShip> = createEntityAdapter<
  IOwnerShip
>();

export const initialState: OwnershipState = ownershipAdapter.getInitialState({
  error: null,
  loaded: null,
  message: null
} as OwnershipState);
