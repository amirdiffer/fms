import { createSelector } from '@ngrx/store';
import { WorkshopSelectors } from '../../workshop.selectors';
import { bodyShopLocationAdapter } from './body-shop-location.entity';

export class BodyShopLocationSelectors {
  static selectAll = createSelector(
    WorkshopSelectors.bodyshopLocationSelector,
    bodyShopLocationAdapter.setAll
  );

  static message = createSelector(
    WorkshopSelectors.bodyshopLocationSelector,
    (state) => state.message
  );

  static error = createSelector(
    WorkshopSelectors.bodyshopLocationSelector,
    (state) => state.error
  );
}