import { createSelector } from '@ngrx/store';
import { serviceShopLocationAdapter } from './service-shop-location.entity';

const {
  selectAll,
  selectIds,
  selectEntities
} = serviceShopLocationAdapter.getSelectors();
const serviceShopLocationState = (state) => state['serviceShopLocation'];

export class ServiceShopLocationSelectors {
  static selectAll = createSelector(serviceShopLocationState, selectAll);
  static count = createSelector(
    serviceShopLocationState,
    (state) => state.resultNumber
  );

  static message = createSelector(
    serviceShopLocationState,
    (state) => state.message
  );

  static error = createSelector(
    serviceShopLocationState,
    (state) => state.error
  );

  static submitted = createSelector(
    serviceShopLocationState,
    (state) => state.submitted
  );

  static selectStatistics = createSelector(
    serviceShopLocationState,
    (state) => state.statistics
  );

  static selectById = createSelector(
    ServiceShopLocationSelectors.selectAll,
    (state, props: { id: number }) => {
      let data = state.filter((x) => x.id == props.id);
      if (data.length > 0) return data[0];
      else return null;
    }
  );
}
