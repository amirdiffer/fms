import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OrganizationSelectors } from './organization.selectors';
import { OrganizationPartialState } from './organization.entity';
import { OrganizationActions } from './organization.actions';
@Injectable()
export class OrganizationFacade {
  organization$ = this.store.pipe(select(OrganizationSelectors.selectAll));
  submitted$ = this.store.pipe(select(OrganizationSelectors.submitted));
  conut$ = this.store.pipe(select(OrganizationSelectors.count));
  error$ = this.store.pipe(select(OrganizationSelectors.error));
  loaded$ = this.store.pipe(select(OrganizationSelectors.loaded));
  constructor(private store: Store<OrganizationPartialState>) {
    this.loadAll();
  }

  loadAll() {
    this.store.dispatch(OrganizationActions.loadAll());
  }
  addOrganization(data: any) {
    this.store.dispatch(OrganizationActions.addOrganization({ data }));
  }
  editOrganization(data: any) {
    this.store.dispatch(OrganizationActions.editOrganization({ data }));
  }
  reset() {
    this.store.dispatch(OrganizationActions.reset());
  }
}
