import { DashboardPartialState } from './dashboard.entity';
import { DashboardSelectors } from '@feature/dashboard/+state/dashboard.selectors';
import { DashboardActions } from '@feature/dashboard/+state/dashboard.actions';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

@Injectable()
export class DashboardFacade {
  dashboard$ = this.store.pipe(select(DashboardSelectors.selectAll));

  message$ = this.store.pipe(select(DashboardSelectors.message));

  error$ = this.store.pipe(select(DashboardSelectors.error));

  suppliers$ = this.store.pipe(select(DashboardSelectors.suppliers));
  assetStatus$ = this.store.pipe(select(DashboardSelectors.assetStatus));
  activeAssets$ = this.store.pipe(select(DashboardSelectors.activeAssets));
  factoryCategory$ = this.store.pipe(select(DashboardSelectors.factoryCategory));
  businessCategory$ = this.store.pipe(select(DashboardSelectors.businessCategory));

  constructor(private store: Store<DashboardPartialState>) { }

  loadAll() {
    this.store.dispatch(DashboardActions.loadAll());
  }
}
