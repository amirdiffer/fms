import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IBodyshopJobCardPartialState } from './body-shop-job-card.entity';
import { BodyShopJobCardActions } from './body-shop-job-card.actions';
import { BodyShopJobCardSelectors } from './body-shop-job-card.selector';

@Injectable()
export class BodyShopJobCardFacade {
  bodyShop$ = this.store.pipe(select(BodyShopJobCardSelectors.selectAll));

  message$ = this.store.pipe(select(BodyShopJobCardSelectors.message));

  error$ = this.store.pipe(select(BodyShopJobCardSelectors.error));

  submitted$ = this.store.pipe(select(BodyShopJobCardSelectors.submitted));
  constructor(private store: Store<IBodyshopJobCardPartialState>) {}

  loadAll() {
    this.store.dispatch(BodyShopJobCardActions.loadAll());
  }
  addJobCard(data: any, assetId: number) {
    this.store.dispatch(BodyShopJobCardActions.addJobCard({ data, assetId }));
  }

  editJobCard(jobCard: any) {
    this.store.dispatch(BodyShopJobCardActions.editJobCard({ jobCard }));
  }

  getJobCardById(id: number) {
    return this.store.pipe(select(BodyShopJobCardSelectors.selectById, { id }));
  }

  resetParams() {
    this.store.dispatch(BodyShopJobCardActions.resetParams());
  }
}
