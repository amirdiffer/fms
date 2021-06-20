import { createSelector } from '@ngrx/store';
import { assetPolicyAdapter } from './asset-policy.entity';

const { selectAll } = assetPolicyAdapter.getSelectors();
const assetPolicySelector = (state) => state['assetPolicy'];
export class AssetPolicySelectors {
  static selectAll = createSelector(
    assetPolicySelector,
    selectAll
  );
  static count = createSelector(
    assetPolicySelector,
    (state) => state.resultNumber
  );

  static loaded = createSelector(
    assetPolicySelector,
    (state) => state.loaded
  );

  static message = createSelector(
    assetPolicySelector,
    (state) => state.message
  );

  static error = createSelector(
    assetPolicySelector,
    (state) => state.error
  );

  static submitted = createSelector(
    assetPolicySelector,
    (state) => state.submitted
  );

  static specificAssetPolicy = createSelector(
    assetPolicySelector,
    (state) => state.specific
  );

  static selectById = createSelector(
    AssetPolicySelectors.selectAll,
    (state, props: { id: number }) => state.find((x) => x.id === props.id)
  );
}
