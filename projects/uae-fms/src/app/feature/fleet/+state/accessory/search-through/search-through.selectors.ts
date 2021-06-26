import { createSelector } from "@ngrx/store";
import { accessorySearchThroughAdapter } from "./search-through.entity";

const { selectAll } = accessorySearchThroughAdapter.getSelectors();
const accessorySearchThroughState = (state) => state['accessorySearchThrough']


export class AccessorySearchThroughSelectors {
    static selectAll = createSelector(
        accessorySearchThroughState,
        selectAll
    );

    static error = createSelector(
        accessorySearchThroughState,
        (state) => state.error
    );
    
    static loaded = createSelector(
        accessorySearchThroughState,
        (state) => state.loaded
    );

}