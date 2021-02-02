import { createSelector } from "@ngrx/store";
import { bodyShopAdapter } from "./body-shop.entity";
import { WorkshopSelectors } from "../workshop.selectors";

export class BodyShopSelectors {
  static selectAll = createSelector(
    WorkshopSelectors.bodyshopSelector,
    bodyShopAdapter.setAll
  );
}
