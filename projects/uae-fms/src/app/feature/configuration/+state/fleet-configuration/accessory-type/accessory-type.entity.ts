import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const FLEET_CONFIGURATION_ACCESSORY_TYPE_FEATURE_KEY = 'accessoryType';


export interface AccessoryTypeState extends EntityState<any> {
    error?: any;
    loaded?: boolean;
    submitted: boolean;
    message?: string;
    accessoryType?:any;
}

export interface AccessoryTypePartialState {
    [FLEET_CONFIGURATION_ACCESSORY_TYPE_FEATURE_KEY]: AccessoryTypeState;
}

export const accessoryTypeAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialState: AccessoryTypeState = accessoryTypeAdapter.getInitialState({
    error: null,
    loaded: null,
    submitted: false,
    message: null,
    accessoryType:null
} as AccessoryTypeState);
