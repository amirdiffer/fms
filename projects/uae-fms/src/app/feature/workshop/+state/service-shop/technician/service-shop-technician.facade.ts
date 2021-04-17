import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ServiceShopTechnicianActions } from './service-shop-technician.actions';
import { IServiceShopTechnicianPartialState } from './service-shop-technician.entity';
import { ServiceShopTechnicianSelectors } from './service-shop-technician.selectors';


@Injectable()
export class ServiceShopTechnicianFacade {
  serviceShop$ = this.store.pipe(select(ServiceShopTechnicianSelectors.selectAll));

  message$ = this.store.pipe(select(ServiceShopTechnicianSelectors.message));

  error$ = this.store.pipe(select(ServiceShopTechnicianSelectors.error));

  submitted$ = this.store.pipe(select(ServiceShopTechnicianSelectors.submitted));

  conut$ = this.store.pipe(select(ServiceShopTechnicianSelectors.count))

  constructor(private store: Store<IServiceShopTechnicianPartialState>) {}

  loadAll() {
    this.store.dispatch(ServiceShopTechnicianActions.loadAll());
  }
  addTechnician(data: any) {
    this.store.dispatch(ServiceShopTechnicianActions.addTechnician({ data }));
  }

  editTechnician(technician: any) {
    this.store.dispatch(
      ServiceShopTechnicianActions.editTechnician({ technician })
    );
  }

  getTechnicianById(id: number) {
    return this.store.pipe(
      select(ServiceShopTechnicianSelectors.selectById, { id })
    );
  }

  resetParams() {
    this.store.dispatch(ServiceShopTechnicianActions.resetParams());
  }
}
