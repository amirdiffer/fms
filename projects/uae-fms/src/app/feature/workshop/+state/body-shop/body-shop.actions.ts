import { createAction, props } from "@ngrx/store";
import { BodyshopStateModel } from "./body-shop.entity";

export class BodyShopActions {
  static loadAll = createAction(
    "[BodyShop] load all data"
  );

  static allDataLoaded = createAction(
    "[BodyShop] all datas are loaded",
    props<{ data: BodyshopStateModel[] }>()
  );

  static error = createAction(
    "[BodyShop] error occurred",
    props<{ reason: any }>()
  )
}
