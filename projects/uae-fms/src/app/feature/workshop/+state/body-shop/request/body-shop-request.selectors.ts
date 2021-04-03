import { createSelector } from '@ngrx/store';
import { bodyShopRequestAdapter } from './body-shop-request.entity';
import { WorkshopSelectors } from '../../workshop.selectors';
const { selectAll } = bodyShopRequestAdapter.getSelectors();

export class BodyShopRequestSelectors {
  static selectAll = createSelector(
    WorkshopSelectors.bodyshopRequestSelector,
    selectAll
  );

  static selectStatistics = createSelector(
    WorkshopSelectors.bodyshopRequestSelector,
    (state) => state.statistics
  );

  static message = createSelector(
    WorkshopSelectors.bodyshopRequestSelector,
    (state) => state.message
  );

  static error = createSelector(
    WorkshopSelectors.bodyshopRequestSelector,
    (state) => state.error
  );
  static submitted = createSelector(
    WorkshopSelectors.bodyshopRequestSelector,
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
