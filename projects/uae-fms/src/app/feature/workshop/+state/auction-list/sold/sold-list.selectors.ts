import { createSelector } from '@ngrx/store';
import { soldListAdapter } from '@feature/workshop/+state/auction-list/sold/sold-list.entity';
const soldListState = (state) => state['soldList'];

export class SoldListSelectors {
  static selectAll = createSelector(soldListState, soldListAdapter.setAll);
}
