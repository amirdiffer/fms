import { createSelector } from '@ngrx/store';
import { operatorAdapter } from './operator.entity';
const { selectAll } = operatorAdapter.getSelectors();
const operatorState = (state) => state['operator'];

export class OperatorSelectors {
  static selectAll = createSelector(operatorState, selectAll);

  static message = createSelector(operatorState, (state) => state.message);

  static error = createSelector(operatorState, (state) => state.error);

  static submitted = createSelector(operatorState, (state) => state.submitted);
  
  static loaded = createSelector(operatorState, (state) => state.loaded);

  static selectStatistics = createSelector(
    operatorState,
    (state) => state.statistics
  );

  static count = createSelector(operatorState, (state) => state.resultNumber);

  static selectById = createSelector(
    OperatorSelectors.selectAll,
    (state, props: { id: number }) => {
      let data = state.filter((x) => x.id == props.id);
      if (data.length > 0) return data[0];
      else return null;
    }
  );
}
