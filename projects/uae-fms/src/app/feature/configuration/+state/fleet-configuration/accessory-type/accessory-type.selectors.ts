import { accessoryTypeAdapter } from "./accessory-type.entity";
import { createSelector } from '@ngrx/store';


const { selectAll } = accessoryTypeAdapter.getSelectors();
const accessoryTypeSelector = (state) => state['accessoryType']
export class AccessoryTypeSelectors {
    static selectAll = createSelector(
        accessoryTypeSelector,
        selectAll
    );

    static specificAccessoryType = createSelector(
        accessoryTypeSelector,
        (state) => state.accessoryType
    );


    static message = createSelector(
        accessoryTypeSelector,
        (state) => state.message
    );

    static error = createSelector(
        accessoryTypeSelector,
        (state) => state.error
      );

    static submitted = createSelector(
        accessoryTypeSelector,
        (state) => state.submitted
    );

    static loaded = createSelector(
        accessoryTypeSelector,
        (state) => state.loaded
    );
}
