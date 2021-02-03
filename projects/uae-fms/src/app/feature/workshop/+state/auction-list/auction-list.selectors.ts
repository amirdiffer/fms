import { createSelector } from '@ngrx/store';
import { WorkshopSelectors } from '../workshop.selectors';
import { auctionListAdapter } from './auction-list.entity';

export class AuctionListSelectors {
  static selectAll = createSelector(
    WorkshopSelectors.auctionListSelector,
    auctionListAdapter.setAll
  );
}
