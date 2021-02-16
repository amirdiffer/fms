import {
  IAuctionListState,
  WORKSHOP_AUCTION_LIST_FEATURE_KEY
} from './auction-list/auction-list.entity';
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

export const WORKSHOP_FEATURE_KEY = 'workshop';

export interface State {
  readonly [WORKSHOP_BODYSHOP_REQUEST_FEATURE_KEY]: BodyShopRequestState;
  readonly [WORKSHOP_BODYSHOP_JOBCARD_FEATURE_KEY] : IBodyshopJobCardState;
  readonly [WORKSHOP_BODYSHOP_TECHNICIAN_FEATURE_KEY] : IBodyShopTechnicianState;
  readonly [WORKSHOP_BODYSHOP_LOCATION_FEATURE_KEY] : IBodyShopLocationState;
  readonly [WORKSHOP_TECHNICAL_INSPECTION_FEATURE_KEY]: ITechnicalInspectionState;
  readonly [WORKSHOP_AUCTION_LIST_FEATURE_KEY]: IAuctionListState;
  readonly [WORKSHOP_TASK_MASTER_FEATURE_KEY]: ITaskMasterState;
}

export interface WorkshopPartialState {
  readonly [WORKSHOP_FEATURE_KEY]: State;
}
