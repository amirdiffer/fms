import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BodyShopTechnicianActions } from './body-shop-technician.actions';
import { IBodyShopTechnicianPartialState } from './body-shop-technician.entity';
import { BodyShopTechnicianSelectors } from './body-shop-technician.selectors';

@Injectable()
export class BodyShopTechnicianFacade {
  bodyShop$ = this.store.pipe(select(BodyShopTechnicianSelectors.selectAll));

  message$ = this.store.pipe(select(BodyShopTechnicianSelectors.message));

  error$ = this.store.pipe(select(BodyShopTechnicianSelectors.error));

  submitted$ = this.store.pipe(select(BodyShopTechnicianSelectors.submitted));

  conut$ = this.store.pipe(select(BodyShopTechnicianSelectors.count));

  constructor(private store: Store<IBodyShopTechnicianPartialState>) {}

  loadAll() {
    this.store.dispatch(BodyShopTechnicianActions.loadAll());
  }
  addTechnician(data: any) {
    this.store.dispatch(BodyShopTechnicianActions.addTechnician({ data }));
  }

  editTechnician(technician: any) {
    this.store.dispatch(
      BodyShopTechnicianActions.editTechnician({ technician })
    );
  }

  getTechnicianById(id: number) {
    return this.store.pipe(
      select(BodyShopTechnicianSelectors.selectById, { id })
    );
  }

  resetParams() {
    this.store.dispatch(BodyShopTechnicianActions.resetParams());
  }
}
