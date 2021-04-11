import { createSelector } from '@ngrx/store';
import { ConfigurationSelectors } from '../../configuration.selectors';
import { subAssetPolicyAdapter } from './sub-asset-policy.entity';
const { selectAll } = subAssetPolicyAdapter.getSelectors();

export class SubAssetPolicySelectors {
  static selectAll = createSelector(
    ConfigurationSelectors.subAssetPolicySelector,
    selectAll
  );

  static message = createSelector(
    ConfigurationSelectors.subAssetPolicySelector,
    (state) => state.message
  );

  static error = createSelector(
    ConfigurationSelectors.subAssetPolicySelector,
    (state) => state.error
  );
}
