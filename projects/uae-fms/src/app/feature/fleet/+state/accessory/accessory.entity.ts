import { IAccessoryStatistics } from '@models/statistics';
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
  statistics?: IAccessoryStatistics;
}
export interface IAccessoryPartialState {
  [FLEET_ACCESSORY_FEATURE_KEY]: IAccessoryState;
}
export const accessoryAdapter: EntityAdapter<
  IAccessoryStateModel | IAccessoryStatistics
> = createEntityAdapter<IAccessoryStateModel | IAccessoryStatistics>();

export const initialState: IAccessoryState = accessoryAdapter.getInitialState({
  error: null,
  loaded: null,
  message: null,
  statistics: null
} as IAccessoryState);
