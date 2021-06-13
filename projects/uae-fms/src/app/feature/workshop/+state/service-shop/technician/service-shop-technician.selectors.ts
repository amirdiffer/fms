import { createSelector } from '@ngrx/store';
import { serviceShopTechnicianAdapter } from './service-shop-technician.entity';
const { selectAll } = serviceShopTechnicianAdapter.getSelectors();
const serviceShopTechnicianState = (state) => state['serviceShopTechnician']

export class ServiceShopTechnicianSelectors {
  static selectAll = createSelector(
    serviceShopTechnicianState,
    selectAll
  );

  static count = createSelector(
    serviceShopTechnicianState,
    (state) => state.resultNumber
  );

  static message = createSelector(
    serviceShopTechnicianState,
    (state) => state.message
  );

  static error = createSelector(
    serviceShopTechnicianState,
    (state) => state.error
  );
  static submitted = createSelector(
    serviceShopTechnicianState,
    (state) => state.submitted
  );
  static selectById = createSelector(
    ServiceShopTechnicianSelectors.selectAll,
    (state, props: { id: number }) => {
      let data = state.filter((x) => x.id == props.id);
      if (data.length > 0) return data[0];
      else return null;
    }
  );
}
