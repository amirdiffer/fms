import { createSelector } from "@ngrx/store";
import { TrafficFinesSelectors } from "../traffic-fines.selectors";
import { assetTrafficFineAdapter } from "./asset-traffic-fine.entity";


export class AssetTrafficFineSelectors {
    static selectAll = createSelector(
        TrafficFinesSelectors.assetTrafficFineSelector,
        assetTrafficFineAdapter.setAll
      );
    
      static message = createSelector(
        TrafficFinesSelectors.assetTrafficFineSelector,
        (state) => state.message
      );
    
      static error = createSelector(
        TrafficFinesSelectors.assetTrafficFineSelector,
        (state) => state.error
      );
}