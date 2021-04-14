import { createSelector } from '@ngrx/store';
import { WorkshopSelectors } from '../../workshop.selectors';
import { serviceShopTechnicianAdapter } from './service-shop-technician.entity';
const { selectAll } = serviceShopTechnicianAdapter.getSelectors();

export class ServiceShopTechnicianSelectors {
  static selectAll = createSelector(
    WorkshopSelectors.serviceshopTechnicianSelector,
    selectAll
  );

  static message = createSelector(
    WorkshopSelectors.serviceshopTechnicianSelector,
    (state) => state.message
  );

  static error = createSelector(
    WorkshopSelectors.serviceshopTechnicianSelector,
    (state) => state.error
  );
  static submitted = createSelector(
    WorkshopSelectors.serviceshopTechnicianSelector,
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
