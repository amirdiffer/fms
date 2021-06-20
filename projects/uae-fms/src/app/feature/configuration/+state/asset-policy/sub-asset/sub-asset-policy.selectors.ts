import { createSelector } from '@ngrx/store';
import { subAssetPolicyAdapter } from './sub-asset-policy.entity';

const { selectAll } = subAssetPolicyAdapter.getSelectors();
const subAssetPolicySelector = (state) => state['subAssetPolicy']
export class SubAssetPolicySelectors {
  static selectAll = createSelector(
    subAssetPolicySelector,
    selectAll
  );
  static count = createSelector(
    subAssetPolicySelector,
    (state) => state.resultNumber
  );
  static message = createSelector(
    subAssetPolicySelector,
    (state) => state.message
  );

  static error = createSelector(
    subAssetPolicySelector,
    (state) => state.error
  );
  static selectById = createSelector(
    SubAssetPolicySelectors.selectAll,
    (state, props: { id: number }) => state.find((x) => x.id === props.id)
  );
}
