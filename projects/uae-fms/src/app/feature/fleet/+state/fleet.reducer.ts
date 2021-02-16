import * as assetMasterReducer from '@feature/fleet/+state/assets/asset-master/asset-master.reducer';
import * as customizationReducer from '@feature/fleet/+state/assets/customization/customization.reducer';
import * as registrationReducer from '@feature/fleet/+state/assets/registration/registration.reducer';
import * as movementOverviewReducer from './movement/overview/movement-overview.reducer';
import * as movementRequestsReducer from './movement/requests/movement-requests.reducer';
import { FLEET_ASSET_MASTER_FEATURE_KEY } from '@feature/fleet/+state/assets/asset-master/asset-master.entity';
import { FLEET_CUSTOMIZATION_FEATURE_KEY } from '@feature/fleet/+state/assets/customization/customization.entity';
import { FLEET_REGISTRATION_FEATURE_KEY } from '@feature/fleet/+state/assets/registration/registration.entity';
import { FLEET_MOVEMENT_OVERVIEW_FEATURE_KEY } from './movement/overview/movement-overview.entity';
import { FLEET_MOVEMENT_REQUESTS_FEATURE_KEY } from './movement/requests/movement-requests.entity';

export const reducers = {
  [FLEET_ASSET_MASTER_FEATURE_KEY]: assetMasterReducer.reducer,
  [FLEET_CUSTOMIZATION_FEATURE_KEY]: customizationReducer.reducer,
  [FLEET_REGISTRATION_FEATURE_KEY]: registrationReducer.reducer,
  [FLEET_MOVEMENT_OVERVIEW_FEATURE_KEY]: movementOverviewReducer.reducer,
  [FLEET_MOVEMENT_REQUESTS_FEATURE_KEY]: movementRequestsReducer.reducer
};
