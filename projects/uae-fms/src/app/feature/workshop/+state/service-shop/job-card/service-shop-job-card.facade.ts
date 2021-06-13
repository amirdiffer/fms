import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ServiceShopJobCardActions } from './service-shop-job-card.actions';
import { IServiceShopJobCardPartialState } from './service-shop-job-card.entity';
import { ServiceShopJobCardSelectors } from './service-shop-job-card.selector';

@Injectable()
export class ServiceShopJobCardFacade {
  serviceShop$ = this.store.pipe(select(ServiceShopJobCardSelectors.selectAll));

  message$ = this.store.pipe(select(ServiceShopJobCardSelectors.message));

  error$ = this.store.pipe(select(ServiceShopJobCardSelectors.error));

  submitted$ = this.store.pipe(select(ServiceShopJobCardSelectors.submitted));

  conut$ = this.store.pipe(select(ServiceShopJobCardSelectors.count));

  constructor(private store: Store<IServiceShopJobCardPartialState>) {this.loadAll()}

  loadAll() {
    this.store.dispatch(ServiceShopJobCardActions.loadAll());
  }
  addJobCard(data: any, assetId: number) {
    this.store.dispatch(
      ServiceShopJobCardActions.addJobCard({ data, assetId })
    );
  }

  editJobCard(jobCard: any) {
    this.store.dispatch(ServiceShopJobCardActions.editJobCard({ jobCard }));
  }

  getJobCardById(id: number) {
    return this.store.pipe(
      select(ServiceShopJobCardSelectors.selectById, { id })
    );
  }

  resetParams() {
    this.store.dispatch(ServiceShopJobCardActions.resetParams());
  }
}
