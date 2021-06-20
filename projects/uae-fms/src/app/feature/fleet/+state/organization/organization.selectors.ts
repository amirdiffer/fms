import { createSelector } from '@ngrx/store';
import { organizationAdapter } from './organization.entity';
const { selectAll } = organizationAdapter.getSelectors();
const organizationState = (state) => state['organization'];
export class OrganizationSelectors {
  static selectAll = createSelector(organizationState, selectAll);
  static count = createSelector(
    organizationState,
    (state) => state.resultNumber
  );
  static submitted = createSelector(
    organizationState,
    (state) => state.submitted
  );
  static loaded = createSelector(organizationState, (state) => state.loaded);
  static error = createSelector(organizationState, (state) => state.error);
}
