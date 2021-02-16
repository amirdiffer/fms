
import * as bodyShopRequestReducer from './body-shop/request/body-shop-request.reducer';
import * as bodyShopJobCardReducer from './body-shop/job-card/body-shop-job-card.reducer'
import * as bodyShopTechnicianReducer from './body-shop/technician/body-shop-technician.reducer'
import * as bodyShopLocationReducer from './body-shop/location/body-shop-location.reducer'
import * as technicalInspectionReducer from './technical-inspections/technical-inspections.reducer';
import * as auctionListReducer from './auction-list/auction-list.reducer';
import * as taskMasterReducer from './task-master/task-master.reducer';
import { WORKSHOP_BODYSHOP_REQUEST_FEATURE_KEY } from './body-shop/request/body-shop-request.entity';
import { WORKSHOP_TECHNICAL_INSPECTION_FEATURE_KEY } from './technical-inspections/technical-inspections.entity';
import { WORKSHOP_AUCTION_LIST_FEATURE_KEY } from './auction-list/auction-list.entity';
import { WORKSHOP_TASK_MASTER_FEATURE_KEY } from './task-master/task-master.entity';
import { WORKSHOP_BODYSHOP_JOBCARD_FEATURE_KEY } from './body-shop/job-card/body-shop-job-card.entity';
import { WORKSHOP_BODYSHOP_TECHNICIAN_FEATURE_KEY } from './body-shop/technician/body-shop-technician.entity';
import { WORKSHOP_BODYSHOP_LOCATION_FEATURE_KEY } from './body-shop/location/body-shop-location.entity';
export const reducers = {
  [WORKSHOP_BODYSHOP_REQUEST_FEATURE_KEY]: bodyShopRequestReducer.reducer,
  [WORKSHOP_BODYSHOP_JOBCARD_FEATURE_KEY] : bodyShopJobCardReducer.reducer,
  [WORKSHOP_BODYSHOP_TECHNICIAN_FEATURE_KEY] : bodyShopTechnicianReducer.reducer,
  [WORKSHOP_BODYSHOP_LOCATION_FEATURE_KEY] : bodyShopLocationReducer.reducer,
  [WORKSHOP_TECHNICAL_INSPECTION_FEATURE_KEY]:technicalInspectionReducer.reducer,
  [WORKSHOP_AUCTION_LIST_FEATURE_KEY]: auctionListReducer.reducer,
  [WORKSHOP_TASK_MASTER_FEATURE_KEY]: taskMasterReducer.reducer
};
