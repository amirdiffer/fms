import { createSelector } from '@ngrx/store';
import { bodyShopLocationAdapter } from './body-shop-location.entity';
const {
  selectAll,
  selectIds,
  selectEntities
} = bodyShopLocationAdapter.getSelectors();
const bodyShopLocationState = (state) => state['bodyShopLocation']

export class BodyShopLocationSelectors {
  static selectAll = createSelector(
    bodyShopLocationState,
    selectAll
  );
  static count = createSelector(
    bodyShopLocationState,
    (state) => state.resultNumber
  );

  static message = createSelector(
    bodyShopLocationState,
    (state) => state.message
  );

  static error = createSelector(
    bodyShopLocationState,
    (state) => state.error
  );

  static submitted = createSelector(
    bodyShopLocationState,
    (state) => state.submitted
  );

  static selectStatistics = createSelector(
    bodyShopLocationState,
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
