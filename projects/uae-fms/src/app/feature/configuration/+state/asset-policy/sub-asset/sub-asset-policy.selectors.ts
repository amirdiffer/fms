import { createSelector } from '@ngrx/store';
import { ConfigurationSelectors } from '../../configuration.selectors';
import { subAssetPolicyAdapter } from './sub-asset-policy.entity';

export class SubAssetPolicySelectors {
  static selectAll = createSelector(
    ConfigurationSelectors.assetPolicySelector,
    subAssetPolicyAdapter.setAll
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
