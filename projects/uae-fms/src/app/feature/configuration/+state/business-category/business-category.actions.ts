import { createAction, props } from '@ngrx/store';
import { BusinessCategoryStateModel } from './business-category.entity';

export class BusinessCategoryActions {
  static loadAll = createAction('[BusinessCategory] load all data');

  static allDataLoaded = createAction(
    '[BusinessCategory] all datas are loaded',
    props<{ data: BusinessCategoryStateModel[] }>()
  );

  static error = createAction(
    '[BusinessCategory] error occurred',
    props<{ reason: any }>()
  );
}
