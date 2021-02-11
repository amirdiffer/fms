import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WORKSHOP_FEATURE_KEY } from './workshop.entity';
export class WorkshopSelectors {
  static featureSelector = createFeatureSelector(WORKSHOP_FEATURE_KEY);

  static bodyshopSelector = createSelector(
    WorkshopSelectors.featureSelector,
    (state) => state['bodyShop']
  );
  static technicalInspectionSelector = createSelector(
    WorkshopSelectors.featureSelector,
    (state) => state['technicalInspection']
  );
  static auctionListSelector = createSelector(
    WorkshopSelectors.featureSelector,
    (state) => state['auctionList']
  );
  static taskMasterSelector = createSelector(
    WorkshopSelectors.featureSelector,
    (state) => state['taskMaster']
  );
}
