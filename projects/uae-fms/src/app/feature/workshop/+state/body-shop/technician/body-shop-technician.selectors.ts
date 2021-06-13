import { createSelector } from '@ngrx/store';
import { bodyShopTechnicianAdapter } from './body-shop-technician.entity';
const { selectAll } = bodyShopTechnicianAdapter.getSelectors();
const bodyShopTechnicianState = (state) => state['bodyShopTechnician']

export class BodyShopTechnicianSelectors {
  static selectAll = createSelector(
    bodyShopTechnicianState,
    selectAll
  );
  static count = createSelector(
    bodyShopTechnicianState,
    (state) => state.resultNumber
  );

  static message = createSelector(
    bodyShopTechnicianState,
    (state) => state.message
  );

  static error = createSelector(
    bodyShopTechnicianState,
    (state) => state.error
  );
  static submitted = createSelector(
    bodyShopTechnicianState,
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
