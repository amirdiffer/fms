import { createSelector } from '@ngrx/store';
import { technicalInspectionAdapter } from './technical-inspections.entity';
const technicalInspectionState = (state) => state['auctionList']

export class TechnicalInspectionSelectors {
  static selectAll = createSelector(
    technicalInspectionState,
    technicalInspectionAdapter.setAll
  );
}
