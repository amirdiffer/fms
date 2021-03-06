import { createSelector } from '@ngrx/store';
import { WorkshopSelectors } from '../../workshop.selectors';
import { bodyShopTechnicianAdapter } from './body-shop-technician.entity';
const { selectAll } = bodyShopTechnicianAdapter.getSelectors();

export class BodyShopTechnicianSelectors {
  static selectAll = createSelector(
    WorkshopSelectors.bodyshopTechnicianSelector,
    selectAll
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
