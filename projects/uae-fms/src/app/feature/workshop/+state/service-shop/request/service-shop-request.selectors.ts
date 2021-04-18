import { createSelector } from '@ngrx/store';
import { WorkshopSelectors } from '../../workshop.selectors';
import { serviceShopRequestAdapter } from './service-shop-request.entity';
const { selectAll } = serviceShopRequestAdapter.getSelectors();

export class ServiceShopRequestSelectors {
  static selectAll = createSelector(
    WorkshopSelectors.serviceshopRequestSelector,
    selectAll
  );

  static count = createSelector(
    WorkshopSelectors.serviceshopRequestSelector,
    (state) => state.resultNumber
  );

  static requests = createSelector(
    WorkshopSelectors.serviceshopRequestSelector,
    (state) => state.requests
  );

  static assetRequest = createSelector(
    WorkshopSelectors.serviceshopRequestSelector,
    (state) => state.assetRequest
  );
  static selectStatistics = createSelector(
    WorkshopSelectors.serviceshopRequestSelector,
    (state) => state.statistics
  );

  static message = createSelector(
    WorkshopSelectors.serviceshopRequestSelector,
    (state) => state.message
  );

  static error = createSelector(
    WorkshopSelectors.serviceshopRequestSelector,
    (state) => state.error
  );
  static submitted = createSelector(
    WorkshopSelectors.serviceshopRequestSelector,
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
