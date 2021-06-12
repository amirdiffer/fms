import { createSelector } from '@ngrx/store';
import { serviceshopJobCardAdapter } from './service-shop-job-card.entity';
const { selectAll } = serviceshopJobCardAdapter.getSelectors();
const serviceShopJobCardState = (state) => state['serviceShopJobCard']

export class ServiceShopJobCardSelectors {
  static selectAll = createSelector(
    serviceShopJobCardState,
    selectAll
  );

  static count = createSelector(
    serviceShopJobCardState,
    (state) => state.resultNumber
  );

  static message = createSelector(
    serviceShopJobCardState,
    (state) => state.message
  );
  static submitted = createSelector(
    serviceShopJobCardState,
    (state) => state.submitted
  );

  static error = createSelector(
    serviceShopJobCardState,
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
