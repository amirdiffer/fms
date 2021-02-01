import { Injectable } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { BodyshopPartialState } from "./body-shop.entity";
import { BodyShopActions } from "./body-shop.actions";
import { BodyShopSelectors } from "./body-shop.selectors";

@Injectable()
export class BodyShopFacade {

  bodyShop$ = this.store.pipe(
    select(BodyShopSelectors.selectAll)
  );

  constructor(private store: Store<BodyshopPartialState>) { }

  loadAll() {
    this.store.dispatch(BodyShopActions.loadAll());
  }
}
