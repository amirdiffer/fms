import { createAction, props } from '@ngrx/store';
import {
  IBusinessCategory,
  IBusinessCategoryPostModel
} from '@models/business-category.model';

export class BusinessCategoryActions {
  static loadAll = createAction('[BusinessCategory] load all data');

  static allDataLoaded = createAction(
    '[BusinessCategory] all datas are loaded',
    props<{ data: IBusinessCategory[] }>()
  );

  static addCategory = createAction(
    '[BusinessCategory] Add Category',
    props<{ data: IBusinessCategoryPostModel }>()
  );

  static categoryAddedSuccessfully = createAction(
    '[BusinessCategory] Category Added Successfully',
    props<{ data: IBusinessCategory }>()
  );

  static error = createAction(
    '[BusinessCategory] error occurred',
    props<{ reason: any }>()
  );
}
