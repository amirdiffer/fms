import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FLEET_FEATURE_KEY } from '@feature/fleet/+state/fleet.entity';
import { ITablePagination } from '@core/table/+state/table.entity';

export class TableSelectors {

  static featureSelector = createFeatureSelector(FLEET_FEATURE_KEY);

  static pagination = createSelector(
    TableSelectors.featureSelector,
    (state) => state['pagination']
  );

  static selectById = createSelector(
    TableSelectors.pagination,
    (state: ITablePagination[], props: { name: string }) => {
      let data = state.filter((x) => x.name == props.name);
      if (data.length > 0) return data[0];
      else return null;
    }
  );

}
