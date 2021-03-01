import { createSelector } from '@ngrx/store';
import { bodyShopRequestAdapter } from './body-shop-request.entity';
import { WorkshopSelectors } from '../../workshop.selectors';
const { selectAll } = bodyShopRequestAdapter.getSelectors();

export class BodyShopRequestSelectors {
  static selectAll = createSelector(
    WorkshopSelectors.bodyshopRequestSelector,
    selectAll
  );

  static message = createSelector(
    WorkshopSelectors.bodyshopRequestSelector,
    (state) => state.message
  );

  static error = createSelector(
    WorkshopSelectors.bodyshopRequestSelector,
    (state) => state.error
  );
}
