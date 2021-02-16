import { createAction, props } from '@ngrx/store';
import { ISoldListModel } from '@feature/workshop/+state/auction-list/sold/sold-list.entity';

export class SoldListActions {
  static loadAll = createAction('[SoldList] load all data');

  static allDataLoaded = createAction(
    '[SoldList] all datas are loaded',
    props<{ data: ISoldListModel[] }>()
  );

  static error = createAction(
    '[SoldList] error occurred',
    props<{ reason: any }>()
  );
}
