import { createSelector } from "@ngrx/store";
import { assetSearchThroughAdapter } from "./search-through.entity";
const { selectAll } = assetSearchThroughAdapter.getSelectors();
const assetSearchThroughState = (state) => state['assetSearchThrough']

export class AssetSearchThroughSelectors {
    static selectAll = createSelector(
        assetSearchThroughState,
        selectAll
    );

    static error = createSelector(
        assetSearchThroughState,
        (state) => state.error
    );
    
    static loaded = createSelector(
        assetSearchThroughState,
        (state) => state.loaded
    );
}