import { createSelector } from '@ngrx/store';
import { bodyShopAdapter } from './body-shop.entity';
import { WorkshopSelectors } from '../workshop.selectors';

export class BodyShopSelectors {
  static selectAll = createSelector(
    WorkshopSelectors.bodyshopSelector,
    bodyShopAdapter.setAll
  );

  static message = createSelector(
    WorkshopSelectors.bodyshopSelector,
    (state) => state.message
  );

  static error = createSelector(
    WorkshopSelectors.bodyshopSelector,
    (state) => state.error
  );
}
