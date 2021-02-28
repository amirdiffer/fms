import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '../fleet.selectors';
import { subAssetAdapter } from './sub-asset.entity';
const { selectAll } = subAssetAdapter.getSelectors();

export class SubAssetSelectors {
  static selectAll = createSelector(
    FleetSelectors.subAssetSelector,
    selectAll
  );

  static message = createSelector(
    FleetSelectors.subAssetSelector,
    (state) => state.message
  );

  static error = createSelector(
    FleetSelectors.subAssetSelector,
    (state) => state.error
  );
}
