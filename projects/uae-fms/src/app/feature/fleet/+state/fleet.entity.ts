import {
  FLEET_ASSET_MASTER_FEATURE_KEY,
  IAssetMasterState
} from '@feature/fleet/+state/assets/asset-master/asset-master.entity';
import {
  FLEET_CUSTOMIZATION_FEATURE_KEY,
  ICustomizationState
} from '@feature/fleet/+state/assets/customization/customization.entity';
import {
  FLEET_REGISTRATION_FEATURE_KEY,
  IRegistrationState
} from '@feature/fleet/+state/assets/registration/registration.entity';

export const FLEET_FEATURE_KEY = 'fleet';

export interface State {
  readonly [FLEET_ASSET_MASTER_FEATURE_KEY]: IAssetMasterState;
  readonly [FLEET_CUSTOMIZATION_FEATURE_KEY]: ICustomizationState;
  readonly [FLEET_REGISTRATION_FEATURE_KEY]: IRegistrationState;
}

export interface WorkshopPartialState {
  readonly [FLEET_FEATURE_KEY]: State;
}
