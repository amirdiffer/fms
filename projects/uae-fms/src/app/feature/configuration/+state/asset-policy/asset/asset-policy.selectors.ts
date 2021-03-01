import { createSelector } from '@ngrx/store';
import { ConfigurationSelectors } from '../../configuration.selectors';
import { assetPolicyAdapter } from './asset-policy.entity';
const { selectAll } = assetPolicyAdapter.getSelectors();

export class AssetPolicySelectors {
  static selectAll = createSelector(
    ConfigurationSelectors.assetPolicySelector,
    selectAll
  );

  static message = createSelector(
    ConfigurationSelectors.assetPolicySelector,
    (state) => state.message
  );

  static error = createSelector(
    ConfigurationSelectors.assetPolicySelector,
    (state) => state.error
  );
}
