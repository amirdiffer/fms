import { createAction, props } from '@ngrx/store';
import { PartListStateModel } from './part-list.entity';

export class PartListActions {
  static loadAll = createAction('[PartList] load all data');

  static allDataLoaded = createAction(
    '[PartList] all datas are loaded',
    props<{ data: PartListStateModel[] }>()
  );

  static error = createAction(
    '[PartList] error occurred',
    props<{ reason: any }>()
  );
}
