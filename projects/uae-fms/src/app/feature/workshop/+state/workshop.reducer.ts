import * as bodyShopRequestReducer from './body-shop/request/body-shop-request.reducer';
import * as bodyShopJobCardReducer from './body-shop/job-card/body-shop-job-card.reducer';
import * as bodyShopTechnicianReducer from './body-shop/technician/body-shop-technician.reducer';
import * as bodyShopLocationReducer from './body-shop/location/body-shop-location.reducer';
import * as technicalInspectionReducer from './technical-inspections/technical-inspections.reducer';
import * as auctionListReducer from '@feature/workshop/+state/auction-list/auction/auction-list.reducer';
import * as soldListReducer from '@feature/workshop/+state/auction-list/sold/sold-list.reducer';
import * as taskMasterReducer from './task-master/task-master.reducer';
import * as serviceShopJobCard from './service-shop/job-card/service-shop-job-card.reducer'
import * as serviceShopLocation from './service-shop/location/service-shop-location.reducer'
import * as serviceShopRequest from './service-shop/request/service-shop-request.reducer'
import * as serviceShopTechnician from './service-shop/technician/service-shop-technician.reducer'
import { WORKSHOP_BODYSHOP_REQUEST_FEATURE_KEY } from './body-shop/request/body-shop-request.entity';
import { WORKSHOP_TECHNICAL_INSPECTION_FEATURE_KEY } from './technical-inspections/technical-inspections.entity';
import { WORKSHOP_AUCTION_LIST_FEATURE_KEY } from '@feature/workshop/+state/auction-list/auction/auction-list.entity';
import {
  soldListAdapter,
  WORKSHOP_SOLD_LIST_FEATURE_KEY
} from '@feature/workshop/+state/auction-list/sold/sold-list.entity';
import { WORKSHOP_TASK_MASTER_FEATURE_KEY } from './task-master/task-master.entity';
import { WORKSHOP_BODYSHOP_JOBCARD_FEATURE_KEY } from './body-shop/job-card/body-shop-job-card.entity';
import { WORKSHOP_BODYSHOP_TECHNICIAN_FEATURE_KEY } from './body-shop/technician/body-shop-technician.entity';
import { WORKSHOP_BODYSHOP_LOCATION_FEATURE_KEY } from './body-shop/location/body-shop-location.entity';
import { WORKSHOP_SERVICESHOP_JOBCARD_FEATURE_KEY } from './service-shop/job-card/service-shop-job-card.entity';
import { WORKSHOP_SERVICESHOP_LOCATION_FEATURE_KEY } from './service-shop/location/service-shop-location.entity';
import { WORKSHOP_SERVICESHOP_REQUEST_FEATURE_KEY } from './service-shop/request/service-shop-request.entity';
import { WORKSHOP_SERVICESHOP_TECHNICIAN_FEATURE_KEY } from './service-shop/technician/service-shop-technician.entity';
export const reducers = {
  [WORKSHOP_BODYSHOP_REQUEST_FEATURE_KEY]: bodyShopRequestReducer.reducer,
  [WORKSHOP_BODYSHOP_JOBCARD_FEATURE_KEY]: bodyShopJobCardReducer.reducer,
  [WORKSHOP_BODYSHOP_TECHNICIAN_FEATURE_KEY]: bodyShopTechnicianReducer.reducer,
  [WORKSHOP_BODYSHOP_LOCATION_FEATURE_KEY]: bodyShopLocationReducer.reducer,
  [WORKSHOP_TECHNICAL_INSPECTION_FEATURE_KEY]:
    technicalInspectionReducer.reducer,
  [WORKSHOP_AUCTION_LIST_FEATURE_KEY]: auctionListReducer.reducer,
  [WORKSHOP_SOLD_LIST_FEATURE_KEY]: soldListReducer.reducer,
  [WORKSHOP_TASK_MASTER_FEATURE_KEY]: taskMasterReducer.reducer,
  [WORKSHOP_SERVICESHOP_JOBCARD_FEATURE_KEY] : serviceShopJobCard.reducer,
  [WORKSHOP_SERVICESHOP_LOCATION_FEATURE_KEY]: serviceShopLocation.reducer,
  [WORKSHOP_SERVICESHOP_REQUEST_FEATURE_KEY]: serviceShopRequest.reducer,
  [WORKSHOP_SERVICESHOP_TECHNICIAN_FEATURE_KEY]:serviceShopTechnician.reducer
};
