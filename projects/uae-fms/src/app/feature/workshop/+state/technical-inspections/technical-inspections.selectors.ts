import { createSelector } from "@ngrx/store";
import { WorkshopSelectors } from "../workshop.selectors";
import { technicalInspectionAdapter } from "./technical-inspections.entity";


export class TechnicalInspectionSelectors {
    static selectAll = createSelector(
        WorkshopSelectors.technicalInspectionSelector,
        technicalInspectionAdapter.setAll
    )
}