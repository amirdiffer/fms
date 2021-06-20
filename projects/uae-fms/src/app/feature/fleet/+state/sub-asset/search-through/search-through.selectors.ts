import { createSelector } from "@ngrx/store";
import { subAssetSearchThroughAdapter } from "./search-through.entity";

const { selectAll } = subAssetSearchThroughAdapter.getSelectors();
const subAssetySearchThroughState = (state) => state['subAssetSearchThrough']


export class SubAssetSearchThroughSelectors {
    static selectAll = createSelector(
        subAssetySearchThroughState,
        selectAll
    );

    static error = createSelector(
        subAssetySearchThroughState,
        (state) => state.error
    );
    
    static loaded = createSelector(
        subAssetySearchThroughState,
        (state) => state.loaded
    );

}