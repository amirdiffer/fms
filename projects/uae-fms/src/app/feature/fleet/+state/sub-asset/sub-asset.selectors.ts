import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '../fleet.selectors';
import { subAssetAdapter } from './sub-asset.entity';

export class SubAssetSelectors {
  static selectAll = createSelector(
    FleetSelectors.subAssetSelector,
    subAssetAdapter.setAll
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
