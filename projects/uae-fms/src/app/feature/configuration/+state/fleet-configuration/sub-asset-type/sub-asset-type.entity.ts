import { IAssetType } from '@models/asset-type.model';
import { ISubAssetType } from '@models/sub-asset';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const FLEET_CONFIGURATION_SUB_ASSET_TYPE_FEATURE_KEY = 'subAssetType';

export interface SubAssetTypeState extends EntityState<IAssetType> {
    error?: any;
    loaded?: boolean;
    submitted: boolean;
    message?: string;
    subAssetType?:any;
}

export interface SubAssetTypePartialState {
    [FLEET_CONFIGURATION_SUB_ASSET_TYPE_FEATURE_KEY]: SubAssetTypeState;
}

export const subAssetTypeAdapter: EntityAdapter<IAssetType> = createEntityAdapter<IAssetType>();

export const initialState: SubAssetTypeState = subAssetTypeAdapter.getInitialState({
    error: null,
    loaded: null,
    submitted: false,
    message: null,
    subAssetType: null
} as SubAssetTypeState);