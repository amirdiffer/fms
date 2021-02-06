import { createAction, props } from '@ngrx/store';
import { IAuctionListModel } from './auction-list.entity';

export class AuctionListActions {
  static loadAll = createAction('[AuctionList] load all data');

  static allDataLoaded = createAction(
    '[AuctionList] all datas are loaded',
    props<{ data: IAuctionListModel[] }>()
  );

  static error = createAction(
    '[AuctionList] error occurred',
    props<{ reason: any }>()
  );
}
