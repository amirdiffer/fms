import { createSelector } from '@ngrx/store';
import { bodyShopJobCardAdapter } from './body-shop-job-card.entity';
const { selectAll } = bodyShopJobCardAdapter.getSelectors();
const bodyShopJobCardState = (state) => state['bodyShopJobCard'];

export class BodyShopJobCardSelectors {
  static selectAll = createSelector(bodyShopJobCardState, selectAll);

  static count = createSelector(
    bodyShopJobCardState,
    (state) => state.resultNumber
  );

  static message = createSelector(
    bodyShopJobCardState,
    (state) => state.message
  );
  static submitted = createSelector(
    bodyShopJobCardState,
    (state) => state.submitted
  );

  static error = createSelector(bodyShopJobCardState, (state) => state.error);
  static selectById = createSelector(
    BodyShopJobCardSelectors.selectAll,
    (state, props: { id: number }) => {
      let data = state.filter((x) => x.id == props.id);
      if (data.length > 0) return data[0];
      else return null;
    }
  );
}
