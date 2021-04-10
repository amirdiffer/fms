import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITablePagination, TABLE_FEATURE_KEY } from '@core/table/+state/table.entity';

export class TableSelectors {

  static featureSelector = createFeatureSelector(TABLE_FEATURE_KEY);

  static pagination = createSelector(
    TableSelectors.featureSelector,
    (state) => state['pagination']
  );

  static selectByName = createSelector(
    TableSelectors.pagination,
    (state: ITablePagination[], props: { name: string }) => {
      let data = state.filter((x) => x.name == props.name);
      if (data.length > 0) return data[0];
      else return null;
    }
  );

}
