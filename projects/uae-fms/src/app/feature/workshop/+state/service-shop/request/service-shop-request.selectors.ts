import { createSelector } from '@ngrx/store';
import { serviceShopRequestAdapter } from './service-shop-request.entity';
const { selectAll } = serviceShopRequestAdapter.getSelectors();
const serviceShopRequest = (state) => state['serviceShopRequest'];

export class ServiceShopRequestSelectors {
  static selectAll = createSelector(serviceShopRequest, selectAll);

  static count = createSelector(
    serviceShopRequest,
    (state) => state.resultNumber
  );

  static requests = createSelector(
    serviceShopRequest,
    (state) => state.requests
  );

  static assetRequest = createSelector(
    serviceShopRequest,
    (state) => state.assetRequest
  );
  static selectStatistics = createSelector(
    serviceShopRequest,
    (state) => state.statistics
  );

  static message = createSelector(serviceShopRequest, (state) => state.message);

  static error = createSelector(serviceShopRequest, (state) => state.error);
  static submitted = createSelector(
    serviceShopRequest,
    (state) => state.submitted
  );

  static selectById = createSelector(
    ServiceShopRequestSelectors.selectAll,
    (state, props: { id: number }) => {
      let data = state.filter((x) => x.id == props.id);
      if (data.length > 0) return data[0];
      else return null;
    }
  );
}
