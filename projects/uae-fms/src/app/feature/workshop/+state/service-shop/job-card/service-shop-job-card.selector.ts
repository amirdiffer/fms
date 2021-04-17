import { createSelector } from '@ngrx/store';
import { WorkshopSelectors } from '../../workshop.selectors';
import { serviceshopJobCardAdapter } from './service-shop-job-card.entity';
const { selectAll } = serviceshopJobCardAdapter.getSelectors();

export class ServiceShopJobCardSelectors {
  static selectAll = createSelector(
    WorkshopSelectors.serviceshopJobCardSelector,
    selectAll
  );

  static count = createSelector(
    WorkshopSelectors.serviceshopJobCardSelector,
    (state) => state.resultNumber
  );

  static message = createSelector(
    WorkshopSelectors.serviceshopJobCardSelector,
    (state) => state.message
  );
  static submitted = createSelector(
    WorkshopSelectors.serviceshopJobCardSelector,
    (state) => state.submitted
  );

  static error = createSelector(
    WorkshopSelectors.serviceshopJobCardSelector,
    (state) => state.error
  );
  static selectById = createSelector(
    ServiceShopJobCardSelectors.selectAll,
    (state, props: { id: number }) => {
      let data = state.filter((x) => x.id == props.id);
      if (data.length > 0) return data[0];
      else return null;
    }
  );
}
