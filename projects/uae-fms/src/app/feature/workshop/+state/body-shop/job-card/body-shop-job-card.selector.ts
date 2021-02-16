import { createSelector } from '@ngrx/store';
import { bodyShopJobCardAdapter } from './body-shop-job-card.entity';
import { WorkshopSelectors } from '../../workshop.selectors';

export class BodyShopJobCardSelectors {
  static selectAll = createSelector(
    WorkshopSelectors.bodyshopJobCardSelector,
    bodyShopJobCardAdapter.setAll
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