import { createSelector } from '@ngrx/store';
import { ConfigurationSelectors } from '../../configuration.selectors';
import { assetPolicyAdapter } from './asset-policy.entity';
const { selectAll } = assetPolicyAdapter.getSelectors();

export class AssetPolicySelectors {
  static selectAll = createSelector(
    ConfigurationSelectors.assetPolicySelector,
    selectAll
  );
  static count = createSelector(
    ConfigurationSelectors.assetPolicySelector,
    (state) => state.resultNumber
  );

  static loaded = createSelector(
    ConfigurationSelectors.assetPolicySelector,
    (state) => state.loaded
  );

  static message = createSelector(
    ConfigurationSelectors.assetPolicySelector,
    (state) => state.message
  );

  static error = createSelector(
    ConfigurationSelectors.assetPolicySelector,
    (state) => state.error
  );

  static submitted = createSelector(
    ConfigurationSelectors.assetPolicySelector,
    (state) => state.submitted
  );
  
  static specificAssetPolicy = createSelector(
    ConfigurationSelectors.assetPolicySelector,
    (state) => state.specific
  );

  static selectById = createSelector(
    AssetPolicySelectors.selectAll,
    (state, props: { id: number }) => state.find((x) => x.id === props.id)
  );
}
