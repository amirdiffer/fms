import { createSelector } from '@ngrx/store';
import { WorkshopSelectors } from '../../workshop.selectors';
import { bodyShopTechnicianAdapter } from './body-shop-technician.entity';

export class BodyShopTechnicianSelectors {
  static selectAll = createSelector(
    WorkshopSelectors.bodyshopTechnicianSelector,
    bodyShopTechnicianAdapter.setAll
  );

  static message = createSelector(
    WorkshopSelectors.bodyshopTechnicianSelector,
    (state) => state.message
  );

  static error = createSelector(
    WorkshopSelectors.bodyshopTechnicianSelector,
    (state) => state.error
  );
}
