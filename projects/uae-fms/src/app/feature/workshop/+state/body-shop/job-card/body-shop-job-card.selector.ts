import { createSelector } from '@ngrx/store';
import { bodyShopJobCardAdapter } from './body-shop-job-card.entity';
import { WorkshopSelectors } from '../../workshop.selectors';
const { selectAll } = bodyShopJobCardAdapter.getSelectors();

export class BodyShopJobCardSelectors {
  static selectAll = createSelector(
    WorkshopSelectors.bodyshopJobCardSelector,
    selectAll
  );

  static message = createSelector(
    WorkshopSelectors.bodyshopJobCardSelector,
    (state) => state.message
  );

  static error = createSelector(
    WorkshopSelectors.bodyshopJobCardSelector,
    (state) => state.error
  );
}
