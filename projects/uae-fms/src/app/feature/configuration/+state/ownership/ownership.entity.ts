import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const CONFIGURATION_OWNERSHIP_FEATURE_KEY = 'ownership';

export interface OwnershipStateModel {
  ownership: string;
  owner: string;
  fleetITCode: string;
  duration: string;
  purpose: string;
  ownerEmail: string;
  ownerPhoneNo: string;
  number: string;
}

export interface OwnershipState extends EntityState<OwnershipStateModel> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface OwnershipPartialState {
  [CONFIGURATION_OWNERSHIP_FEATURE_KEY]: OwnershipState;
}

export const ownershipAdapter: EntityAdapter<OwnershipStateModel> = createEntityAdapter<
  OwnershipStateModel
>();

export const initialState: OwnershipState = ownershipAdapter.getInitialState({
  error: null,
  loaded: null,
  message: null
} as OwnershipState);
