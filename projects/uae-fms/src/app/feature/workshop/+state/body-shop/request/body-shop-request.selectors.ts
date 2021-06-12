import { createSelector } from '@ngrx/store';
import { bodyShopRequestAdapter } from './body-shop-request.entity';
const { selectAll } = bodyShopRequestAdapter.getSelectors();
const bodyShopRequestState = (state) => state['bodyShopRequest']

export class BodyShopRequestSelectors {
  static selectAll = createSelector(
    bodyShopRequestState,
    selectAll
  );

  static count = createSelector(
    bodyShopRequestState,
    (state) => state.resultNumber
  );

  static requests = createSelector(
    bodyShopRequestState,
    (state) => state.requests
  );

  static assetRequest = createSelector(
    bodyShopRequestState,
    (state) => state.assetRequest
  );
  static selectStatistics = createSelector(
    bodyShopRequestState,
    (state) => state.statistics
  );
  static specificRequest = createSelector(
    bodyShopRequestState,
    (state) => state.specificRequest
  );

  static message = createSelector(
    bodyShopRequestState,
    (state) => state.message
  );

  static error = createSelector(
    bodyShopRequestState,
    (state) => state.error
  );
  static submitted = createSelector(
    bodyShopRequestState,
    (state) => state.submitted
  );

  static selectById = createSelector(
    BodyShopRequestSelectors.selectAll,
    (state, props: { id: number }) => {
      let data = state.filter((x) => x.id == props.id);
      if (data.length > 0) return data[0];
      else return null;
    }
  );
}
