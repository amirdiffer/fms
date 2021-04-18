import { createSelector } from '@ngrx/store';
import { WorkshopSelectors } from '../../workshop.selectors';
import { serviceShopLocationAdapter } from './service-shop-location.entity';

const {
  selectAll,
  selectIds,
  selectEntities
} = serviceShopLocationAdapter.getSelectors();

export class ServiceShopLocationSelectors {
  static selectAll = createSelector(
    WorkshopSelectors.serviceshopLocationSelector,
    selectAll
  );
  static count = createSelector(
    WorkshopSelectors.serviceshopLocationSelector,
    (state) => state.resultNumber
  );

  static message = createSelector(
    WorkshopSelectors.serviceshopLocationSelector,
    (state) => state.message
  );

  static error = createSelector(
    WorkshopSelectors.serviceshopLocationSelector,
    (state) => state.error
  );

  static submitted = createSelector(
    WorkshopSelectors.serviceshopLocationSelector,
    (state) => state.submitted
  );

  static selectStatistics = createSelector(
    WorkshopSelectors.serviceshopLocationSelector,
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
