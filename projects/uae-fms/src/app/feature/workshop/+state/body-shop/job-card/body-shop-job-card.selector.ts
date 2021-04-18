import { createSelector } from '@ngrx/store';
import { bodyShopJobCardAdapter } from './body-shop-job-card.entity';
import { WorkshopSelectors } from '../../workshop.selectors';
const { selectAll } = bodyShopJobCardAdapter.getSelectors();

export class BodyShopJobCardSelectors {
  static selectAll = createSelector(
    WorkshopSelectors.bodyshopJobCardSelector,
    selectAll
  );

  static count = createSelector(
    WorkshopSelectors.bodyshopJobCardSelector,
    (state) => state.resultNumber
  );

  static message = createSelector(
    WorkshopSelectors.bodyshopJobCardSelector,
    (state) => state.message
  );
  static submitted = createSelector(
    WorkshopSelectors.bodyshopJobCardSelector,
    (state) => state.submitted
  );

  static error = createSelector(
    WorkshopSelectors.bodyshopJobCardSelector,
    (state) => state.error
  );
  static selectById = createSelector(
    BodyShopJobCardSelectors.selectAll,
    (state, props: { id: number }) => {
      let data = state.filter((x) => x.id == props.id);
      if (data.length > 0) return data[0];
      else return null;
    }
  );
}
