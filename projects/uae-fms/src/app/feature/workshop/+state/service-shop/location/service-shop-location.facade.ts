import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ServiceShopLocationActions } from './service-shop-location.actions';
import { IServiceShopLocationPartialState } from './service-shop-location.entity';
import { ServiceShopLocationSelectors } from './service-shop-location.selectors';


@Injectable()
export class ServiceShopLocationFacade {
  serviceShop$ = this.store.pipe(select(ServiceShopLocationSelectors.selectAll));

  message$ = this.store.pipe(select(ServiceShopLocationSelectors.message));

  error$ = this.store.pipe(select(ServiceShopLocationSelectors.error));

  submitted$ = this.store.pipe(select(ServiceShopLocationSelectors.submitted));
  constructor(private store: Store<IServiceShopLocationPartialState>) {}

  loadAll() {
    this.store.dispatch(ServiceShopLocationActions.loadAll());
  }
  addLocation(data: any) {
    this.store.dispatch(ServiceShopLocationActions.addServiceShopLocation({ data }));
  }

  editLocation(serviceShopLocation: any) {
    this.store.dispatch(
      ServiceShopLocationActions.editServiceShopLocation({ serviceShopLocation })
    );
  }

  getLocationById(id: number) {
    return this.store.pipe(
      select(ServiceShopLocationSelectors.selectById, { id })
    );
  }

  resetParams() {
    this.store.dispatch(ServiceShopLocationActions.resetParams());
  }
}
