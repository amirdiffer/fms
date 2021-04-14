import { ILocation } from '@models/body-shop';
import { createAction, props } from '@ngrx/store';

export class ServiceShopLocationActions {
  static loadAll = createAction('[serviceShopLocation] load all data');

  static allDataLoaded = createAction(
    '[serviceShopLocation] all data are loaded',
    props<{ data: ILocation[] }>()
  );

  static addServiceShopLocation = createAction(
    '[serviceShopLocation] add serviceshop Location',
    props<{ data: any }>()
  );

  static serviceshopLocationAddedSuccessfully = createAction(
    '[serviceShopLocation] serviceshop Location added successfully',
    props<{ data: ILocation }>()
  );

  static editServiceShopLocation = createAction(
    '[serviceShopLocation] Editing serviceshop Location',
    props<{ serviceShopLocation: any }>()
  );

  static serviceShopLocationEditedSuccessfully = createAction(
    '[serviceShopLocation] serviceshop Location Edited Successfully',
    props<{ serviceShopLocation: any }>()
  );
  static resetParams = createAction('[serviceShopLocation] Reset Parameters');
  static error = createAction(
    '[serviceShopLocation] error occurred',
    props<{ reason: any }>()
  );
}
