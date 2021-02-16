import { Action, createReducer } from '@ngrx/store';
import { State, WORKSHOP_FEATURE_KEY } from './workshop.entity';
import * as bodyShopReducer from './body-shop/body-shop.reducer';
import * as technicalInspectionReducer from './technical-inspections/technical-inspections.reducer';
import * as auctionListReducer from '@feature/workshop/+state/auction-list/auction/auction-list.reducer';
import * as soldListReducer from '@feature/workshop/+state/auction-list/sold/sold-list.reducer.ts';
import * as taskMasterReducer from './task-master/task-master.reducer';
import { WORKSHOP_BODYSHOP_FEATURE_KEY } from './body-shop/body-shop.entity';
import { WORKSHOP_TECHNICAL_INSPECTION_FEATURE_KEY } from './technical-inspections/technical-inspections.entity';
import { WORKSHOP_AUCTION_LIST_FEATURE_KEY } from '@feature/workshop/+state/auction-list/auction/auction-list.entity';
import {
  soldListAdapter,
  WORKSHOP_SOLD_LIST_FEATURE_KEY
} from '@feature/workshop/+state/auction-list/sold/sold-list.entity';
import { WORKSHOP_TASK_MASTER_FEATURE_KEY } from './task-master/task-master.entity';

export const reducers = {
  [WORKSHOP_BODYSHOP_FEATURE_KEY]: bodyShopReducer.reducer,
  [WORKSHOP_TECHNICAL_INSPECTION_FEATURE_KEY]:
    technicalInspectionReducer.reducer,
  [WORKSHOP_AUCTION_LIST_FEATURE_KEY]: auctionListReducer.reducer,
  [WORKSHOP_SOLD_LIST_FEATURE_KEY]: soldListReducer.reducer,
  [WORKSHOP_TASK_MASTER_FEATURE_KEY]: taskMasterReducer.reducer
};
