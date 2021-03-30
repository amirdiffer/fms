import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OrganizationSelectors } from './organization.selectors';
import { OrganizationPartialState } from './organization.entity';
import { OrganizationActions } from './organization.actions';
@Injectable()
export class OrganizationFacade {
  organization$ = this.store.pipe(select(OrganizationSelectors.selectAll));
  submitted$ = this.store.pipe(select(OrganizationSelectors.submitted));
  error$ = this.store.pipe(select(OrganizationSelectors.error));
  constructor(private store: Store<OrganizationPartialState>) { }

  loadAll() {
    this.store.dispatch(OrganizationActions.loadAll());
  }
  addOrganization(data: any) {
    this.store.dispatch(OrganizationActions.addOrganization({ data }));
  }
  reset() {
    this.store.dispatch(OrganizationActions.reset());
  }
}
