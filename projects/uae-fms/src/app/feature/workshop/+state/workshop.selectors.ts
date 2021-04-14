import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WORKSHOP_FEATURE_KEY } from './workshop.entity';
export class WorkshopSelectors {
  static featureSelector = createFeatureSelector(WORKSHOP_FEATURE_KEY);

  static bodyshopRequestSelector = createSelector(
    WorkshopSelectors.featureSelector,
    (state) => state['bodyShopRequest']
  );
  static serviceshopRequestSelector = createSelector(
    WorkshopSelectors.featureSelector,
    (state) => state['serviceShopRequest']
  );
  static bodyshopJobCardSelector = createSelector(
    WorkshopSelectors.featureSelector,
    (state) => state['bodyShopJobCard']
  );
  static serviceshopJobCardSelector = createSelector(
    WorkshopSelectors.featureSelector,
    (state) => state['serviceShopJobCard']
  );
  static bodyshopTechnicianSelector = createSelector(
    WorkshopSelectors.featureSelector,
    (state) => state['bodyShopTechnician']
  );
  static serviceshopTechnicianSelector = createSelector(
    WorkshopSelectors.featureSelector,
    (state) => state['serviceShopTechnician']
  );
  static bodyshopLocationSelector = createSelector(
    WorkshopSelectors.featureSelector,
    (state) => state['bodyShopLocation']
  );
  static serviceshopLocationSelector = createSelector(
    WorkshopSelectors.featureSelector,
    (state) => state['serviceShopLocation']
  );
  static technicalInspectionSelector = createSelector(
    WorkshopSelectors.featureSelector,
    (state) => state['technicalInspection']
  );
  static auctionListSelector = createSelector(
    WorkshopSelectors.featureSelector,
    (state) => state['auctionList']
  );
  static soldListSelector = createSelector(
    WorkshopSelectors.featureSelector,
    (state) => state['soldList']
  );
  static taskMasterSelector = createSelector(
    WorkshopSelectors.featureSelector,
    (state) => state['taskMaster']
  );
}
