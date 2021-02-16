import { createSelector } from '@ngrx/store';
import { soldListAdapter } from '@feature/workshop/+state/auction-list/sold/sold-list.entity';
import { WorkshopSelectors } from '@feature/workshop/+state/workshop.selectors';

export class SoldListSelectors {
  static selectAll = createSelector(
    WorkshopSelectors.soldListSelector,
    soldListAdapter.setAll
  );
}
