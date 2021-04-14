import {
  IAuctionListState,
  WORKSHOP_AUCTION_LIST_FEATURE_KEY
} from './auction-list/auction/auction-list.entity';
import {
  IBodyshopJobCardState,
  WORKSHOP_BODYSHOP_JOBCARD_FEATURE_KEY
} from './body-shop/job-card/body-shop-job-card.entity';
import {
  IBodyShopLocationState,
  WORKSHOP_BODYSHOP_LOCATION_FEATURE_KEY
} from './body-shop/location/body-shop-location.entity';
import {
  WORKSHOP_BODYSHOP_REQUEST_FEATURE_KEY,
  BodyShopRequestState
} from './body-shop/request/body-shop-request.entity';
import {
  IBodyShopTechnicianState,
  WORKSHOP_BODYSHOP_TECHNICIAN_FEATURE_KEY
} from './body-shop/technician/body-shop-technician.entity';
import {
  ITaskMasterState,
  WORKSHOP_TASK_MASTER_FEATURE_KEY
} from './task-master/task-master.entity';
import {
  WORKSHOP_TECHNICAL_INSPECTION_FEATURE_KEY,
  ITechnicalInspectionState
} from './technical-inspections/technical-inspections.entity';
import {
  ISoldListState,
  WORKSHOP_SOLD_LIST_FEATURE_KEY
} from '@feature/workshop/+state/auction-list/sold/sold-list.entity';
import { IServiceShopJobCardState, WORKSHOP_SERVICESHOP_JOBCARD_FEATURE_KEY } from './service-shop/job-card/service-shop-job-card.entity';
import { IServiceShopLocationState, WORKSHOP_SERVICESHOP_LOCATION_FEATURE_KEY } from './service-shop/location/service-shop-location.entity';
import { ServiceShopRequestState, WORKSHOP_SERVICESHOP_REQUEST_FEATURE_KEY } from './service-shop/request/service-shop-request.entity';
import { IServiceShopTechnicianState, WORKSHOP_SERVICESHOP_TECHNICIAN_FEATURE_KEY } from './service-shop/technician/service-shop-technician.entity';

export const WORKSHOP_FEATURE_KEY = 'workshop';

export interface State {
  readonly [WORKSHOP_BODYSHOP_REQUEST_FEATURE_KEY]: BodyShopRequestState;
  readonly [WORKSHOP_BODYSHOP_JOBCARD_FEATURE_KEY]: IBodyshopJobCardState;
  readonly [WORKSHOP_BODYSHOP_TECHNICIAN_FEATURE_KEY]: IBodyShopTechnicianState;
  readonly [WORKSHOP_BODYSHOP_LOCATION_FEATURE_KEY]: IBodyShopLocationState;
  readonly [WORKSHOP_TECHNICAL_INSPECTION_FEATURE_KEY]: ITechnicalInspectionState;
  readonly [WORKSHOP_AUCTION_LIST_FEATURE_KEY]: IAuctionListState;
  readonly [WORKSHOP_SOLD_LIST_FEATURE_KEY]: ISoldListState;
  readonly [WORKSHOP_TASK_MASTER_FEATURE_KEY]: ITaskMasterState;
  readonly [WORKSHOP_SERVICESHOP_JOBCARD_FEATURE_KEY]:IServiceShopJobCardState;
  readonly [WORKSHOP_SERVICESHOP_LOCATION_FEATURE_KEY]:IServiceShopLocationState;
  readonly [WORKSHOP_SERVICESHOP_REQUEST_FEATURE_KEY]:ServiceShopRequestState;
  readonly [WORKSHOP_SERVICESHOP_TECHNICIAN_FEATURE_KEY]:IServiceShopTechnicianState
}

export interface WorkshopPartialState {
  readonly [WORKSHOP_FEATURE_KEY]: State;
}
