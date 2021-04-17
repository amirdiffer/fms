import { createSelector } from '@ngrx/store';
import { WorkshopSelectors } from '../../workshop.selectors';
import { bodyShopTechnicianAdapter } from './body-shop-technician.entity';
const { selectAll } = bodyShopTechnicianAdapter.getSelectors();

export class BodyShopTechnicianSelectors {
  static selectAll = createSelector(
    WorkshopSelectors.bodyshopTechnicianSelector,
    selectAll
  );
  static count = createSelector(
    WorkshopSelectors.bodyshopTechnicianSelector,
    (state) => state.resultNumber
  );

  static message = createSelector(
    WorkshopSelectors.bodyshopTechnicianSelector,
    (state) => state.message
  );

  static error = createSelector(
    WorkshopSelectors.bodyshopTechnicianSelector,
    (state) => state.error
  );
  static submitted = createSelector(
    WorkshopSelectors.bodyshopTechnicianSelector,
    (state) => state.submitted
  );
  static selectById = createSelector(
    BodyShopTechnicianSelectors.selectAll,
    (state, props: { id: number }) => {
      let data = state.filter((x) => x.id == props.id);
      if (data.length > 0) return data[0];
      else return null;
    }
  );
}
