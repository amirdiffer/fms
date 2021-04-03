import { createSelector } from '@ngrx/store';
import { WorkshopSelectors } from '../../workshop.selectors';
import { bodyShopLocationAdapter } from './body-shop-location.entity';
const {
  selectAll,
  selectIds,
  selectEntities
} = bodyShopLocationAdapter.getSelectors();

export class BodyShopLocationSelectors {
  static selectAll = createSelector(
    WorkshopSelectors.bodyshopLocationSelector,
    selectAll
  );

  static message = createSelector(
    WorkshopSelectors.bodyshopLocationSelector,
    (state) => state.message
  );

  static error = createSelector(
    WorkshopSelectors.bodyshopLocationSelector,
    (state) => state.error
  );

  static submitted = createSelector(
    WorkshopSelectors.bodyshopLocationSelector,
    (state) => state.submitted
  );

  static selectStatistics = createSelector(
    WorkshopSelectors.bodyshopLocationSelector,
    (state) => state.statistics
  );

  static selectById = createSelector(
    BodyShopLocationSelectors.selectAll,
    (state, props: { id: number }) => {
      let data = state.filter((x) => x.id == props.id);
      if (data.length > 0) return data[0];
      else return null;
    }
  );
}
