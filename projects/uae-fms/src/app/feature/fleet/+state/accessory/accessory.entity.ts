import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const FLEET_ACCESSORY_FEATURE_KEY = 'accessory';
export interface IAccessoryStateModel {
  item: string;
  type: string;
  asset: string;
  assignedTo: string;
  quantity: number;
}

export interface IAccessoryState extends EntityState<IAccessoryStateModel> {
  error?: any;
  loaded?: boolean;
  message?: string;
}
export interface IAccessoryPartialState {
  [FLEET_ACCESSORY_FEATURE_KEY]: IAccessoryState;
}
export const accessoryAdapter: EntityAdapter<IAccessoryStateModel> = createEntityAdapter<
  IAccessoryStateModel
>();

export const initialState: IAccessoryState = accessoryAdapter.getInitialState({
  error: null,
  loaded: null,
  message: null
} as IAccessoryState);
