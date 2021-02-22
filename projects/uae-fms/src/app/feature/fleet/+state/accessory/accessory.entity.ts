import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IAccessory } from '@models/accessory';


export const FLEET_ACCESSORY_FEATURE_KEY = 'accessory';

export interface IAccessoryState extends EntityState<IAccessory> {
    error?: any;
    loaded?: boolean;
    message?: string;
}
export interface IAccessoryPartialState {
    [FLEET_ACCESSORY_FEATURE_KEY ] : IAccessoryState
}
export const accessoryAdapter : EntityAdapter<IAccessory> = createEntityAdapter<IAccessory>();

export const initialState: IAccessoryState = accessoryAdapter.getInitialState({
    error: null,
    loaded: null,
    message: null
} as IAccessoryState)
