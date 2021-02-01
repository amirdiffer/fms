import { createFeatureSelector } from "@ngrx/store";
import { WORKSHOP_FEATURE_KEY } from "./workshop.entity";
export class WorkshopSelectors {
  static featureSelector = createFeatureSelector(WORKSHOP_FEATURE_KEY);
}
