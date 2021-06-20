import { createSelector } from "@ngrx/store";
import { operatorSearchThroughAdapter } from "./search-through.entity";

const { selectAll } = operatorSearchThroughAdapter.getSelectors();
const operatorSearchThroughState = (state) => state['accessorySearchThrough']


export class OperatorSearchThroughSelectors {
    static selectAll = createSelector(
        operatorSearchThroughState,
        selectAll
    );

    static error = createSelector(
        operatorSearchThroughState,
        (state) => state.error
    );
    
    static loaded = createSelector(
        operatorSearchThroughState,
        (state) => state.loaded
    );

}