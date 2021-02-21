import * as assetMasterReducer from '@feature/fleet/+state/assets/asset-master/asset-master.reducer';
import * as customizationReducer from '@feature/fleet/+state/assets/customization/customization.reducer';
import * as registrationReducer from '@feature/fleet/+state/assets/registration/registration.reducer';
import * as movementOverviewReducer from './movement/overview/movement-overview.reducer';
import * as movementRequestsReducer from './movement/requests/movement-requests.reducer';
import * as operatorReducer from './operator/operator.reducer'
import * as accessoryReducer from './accessory/accessory.reducer'
import * as subAssetReducer from './sub-asset/sub-asset.reducer';
import * as organizationReducer from './organization/organization.reducer';
import { FLEET_ASSET_MASTER_FEATURE_KEY } from '@feature/fleet/+state/assets/asset-master/asset-master.entity';
import { FLEET_CUSTOMIZATION_FEATURE_KEY } from '@feature/fleet/+state/assets/customization/customization.entity';
import { FLEET_REGISTRATION_FEATURE_KEY } from '@feature/fleet/+state/assets/registration/registration.entity';
import { FLEET_MOVEMENT_OVERVIEW_FEATURE_KEY } from './movement/overview/movement-overview.entity';
import { FLEET_MOVEMENT_REQUESTS_FEATURE_KEY } from './movement/requests/movement-requests.entity';
import { FLEET_OPERATOR_FEATURE_KEY } from './operator/operator.entity';
import { FLEET_ACCESSORY_FEATURE_KEY } from './accessory/accessory.entity';
import { FLEET_SUB_ASSET_FEATURE_KEY } from './sub-asset/sub-asset.entity';
import { FLEET_ORGANIZATION_FEATURE_KEY } from './organization/organization.entity';

export const reducers = {
  [FLEET_ASSET_MASTER_FEATURE_KEY]: assetMasterReducer.reducer,
  [FLEET_CUSTOMIZATION_FEATURE_KEY]: customizationReducer.reducer,
  [FLEET_REGISTRATION_FEATURE_KEY]: registrationReducer.reducer,
  [FLEET_MOVEMENT_OVERVIEW_FEATURE_KEY]: movementOverviewReducer.reducer,
  [FLEET_MOVEMENT_REQUESTS_FEATURE_KEY]: movementRequestsReducer.reducer,
  [FLEET_REGISTRATION_FEATURE_KEY]: registrationReducer.reducer,
  [FLEET_OPERATOR_FEATURE_KEY]: operatorReducer.reducer,
  [FLEET_ACCESSORY_FEATURE_KEY]: accessoryReducer.reducer,
  [FLEET_SUB_ASSET_FEATURE_KEY]: subAssetReducer.reducer,
  [FLEET_ORGANIZATION_FEATURE_KEY]: organizationReducer.reducer
};
