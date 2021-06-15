import { createSelector } from '@ngrx/store';
import { customizationAdapter } from './customization.entity';
const { selectAll } = customizationAdapter.getSelectors();
const assetCustomizationState = (state) => state['customization'];

export class CustomizationSelectors {
  static selectAll = createSelector(assetCustomizationState, selectAll);
  static count = createSelector(
    assetCustomizationState,
    (state) => state.resultNumber
  );
}
