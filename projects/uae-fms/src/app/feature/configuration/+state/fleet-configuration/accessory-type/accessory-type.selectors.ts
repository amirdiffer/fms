import { ConfigurationSelectors } from "../../configuration.selectors";
import { accessoryTypeAdapter } from "./accessory-type.entity";
import { createSelector } from '@ngrx/store';


const { selectAll } = accessoryTypeAdapter.getSelectors();

export class AccessoryTypeSelectors {
    static selectAll = createSelector(
        ConfigurationSelectors.accessoryTypeSelector,
        selectAll
    );
    
    static specificAccessoryType = createSelector(
        ConfigurationSelectors.accessoryTypeSelector,
        (state) => state.accessoryType
    );


    static message = createSelector(
        ConfigurationSelectors.accessoryTypeSelector,
        (state) => state.message
    );

    static error = createSelector(
        ConfigurationSelectors.accessoryTypeSelector,
        (state) => state.error
      );
    
    static submitted = createSelector(
        ConfigurationSelectors.accessoryTypeSelector,
        (state) => state.submitted
    );

    static loaded = createSelector(
        ConfigurationSelectors.accessoryTypeSelector,
        (state) => state.loaded
    );
}