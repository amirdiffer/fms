import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FLEET_FEATURE_KEY } from './fleet.entity';

export class FleetSelectors {
  static featureSelector = createFeatureSelector(FLEET_FEATURE_KEY);


  /* ''''''''''ASSET'''''''''' */
  static assetMasterSelector = createSelector(
    FleetSelectors.featureSelector,
    (state) => state['assetMaster']
  );

  static customizationSelector = createSelector(
    FleetSelectors.featureSelector,
    (state) => state['customization']
  );

  static registrationSelector = createSelector(
    FleetSelectors.featureSelector,
    (state) => state['registration']
  );


  /* ''''''''''ACCESSORY'''''''''' */
  static accessorySelector = createSelector(
    FleetSelectors.featureSelector,
    (state) => state['accessory']
  );


  /* ''''''''''MOVEMENT'''''''''' */
  static movementOverviewSelector = createSelector(
    FleetSelectors.featureSelector,
    (state) => state['movementOverview']
  );
  static movementRequestsSelector = createSelector(
    FleetSelectors.featureSelector,
    (state) => state['movementRequests']
  );
  static movementOverviewSelectorTemporary = createSelector(
    FleetSelectors.featureSelector,
    (state) => state['movementOverviewTemporary']
  );
  static movementRequestsSelectorTemporary = createSelector(
    FleetSelectors.featureSelector,
    (state) => state['movementRequestsTemporary']
  );


  /* ''''''''''SUB ASSET'''''''''' */
  static subAssetSelector = createSelector(
    FleetSelectors.featureSelector,
    (state) => state['sub-asset']
  );


  /* ''''''''''OPERATOR'''''''''' */
  static operatorSelector = createSelector(
    FleetSelectors.featureSelector,
    (state) => state['operator']
  );

  static operatorTrafficFineSelector = createSelector(
    FleetSelectors.featureSelector,
    (state) => state['operator-traffic-fine']
  );

  static operatorMovementHistorySelector = createSelector(
    FleetSelectors.featureSelector,
    (state) => state['operator-movement-history']
  );
  
  
  /* ''''''''''ORGANIZATION'''''''''' */
  static organizationSelector = createSelector(
    FleetSelectors.featureSelector,
    (state) => state['organization']
  );
}
