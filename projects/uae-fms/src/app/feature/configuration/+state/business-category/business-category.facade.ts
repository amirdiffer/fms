import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BusinessCategorySelectors } from './business-category.selectors';
import { BusinessCategoryPartialState } from './business-category.entity';
import { BusinessCategoryActions } from './business-category.actions';

@Injectable()
export class BusinessCategoryFacade {
  businessCategory$ = this.store.pipe(
    select(BusinessCategorySelectors.selectAll)
  );

  message$ = this.store.pipe(select(BusinessCategorySelectors.message));

  error$ = this.store.pipe(select(BusinessCategorySelectors.error));

  submitted$ = this.store.pipe(select(BusinessCategorySelectors.submitted));

  loaded$ = this.store.pipe(select(BusinessCategorySelectors.loaded));

  constructor(private store: Store<BusinessCategoryPartialState>) {}

  loadAll() {
    this.store.dispatch(BusinessCategoryActions.loadAll());
  }

  addCategory(data: any) {
    this.store.dispatch(BusinessCategoryActions.addCategory({ data }));
  }

  editCategory(category: any, id) {
    this.store.dispatch(BusinessCategoryActions.editCategory({ category, id }));
  }

  reset() {
    this.store.dispatch(BusinessCategoryActions.reset());
  }
}
