import { IAccessoryStatistics } from '@models/statistics';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IAccessory } from '@models/accessory';

export const FLEET_ACCESSORY_FEATURE_KEY = 'accessory';

export interface IAccessoryState extends EntityState<IAccessory> {
    error?: any;
    loaded?: boolean;
    message?: string;
    statistics?: IAccessoryStatistics;
}
export interface IAccessoryPartialState {
  [FLEET_ACCESSORY_FEATURE_KEY]: IAccessoryState;
}

export const accessoryAdapter : EntityAdapter<IAccessory> = createEntityAdapter<IAccessory>();

export const initialState: IAccessoryState = accessoryAdapter.getInitialState({
  error: null,
  loaded: null,
  message: null,
  statistics: null
} as IAccessoryState);
