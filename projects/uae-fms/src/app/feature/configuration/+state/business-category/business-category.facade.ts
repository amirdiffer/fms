import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BusinessCategorySelectors } from './business-category.selectors';
import { BusinessCategoryPartialState } from './business-category.entity';
import { BusinessCategoryActions } from './business-category.actions';
import { IBusinessCategoryPostModel } from '@models/business-category.model';

@Injectable()
export class BusinessCategoryFacade {
  businessCategory$ = this.store.pipe(
    select(BusinessCategorySelectors.selectAll)
  );

  message$ = this.store.pipe(select(BusinessCategorySelectors.message));

  error$ = this.store.pipe(select(BusinessCategorySelectors.error));

  constructor(private store: Store<BusinessCategoryPartialState>) {}

  loadAll() {
    this.store.dispatch(BusinessCategoryActions.loadAll());
  }

  addCategory(data: IBusinessCategoryPostModel) {
    this.store.dispatch(BusinessCategoryActions.addCategory({ data }));
  }
}
