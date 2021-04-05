import { ILocation } from '@models/body-shop';
import { createAction, props } from '@ngrx/store';

export class BodyShopLocationActions {
  static loadAll = createAction('[bodyShopLocation] load all data');

  static allDataLoaded = createAction(
    '[bodyShopLocation] all data are loaded',
    props<{ data: ILocation[] }>()
  );

  static addBodyShopLocation = createAction(
    '[BodyShopLocations] add bodyShopLocation',
    props<{ data: any }>()
  );

  static bodyShopLocationAddedSuccessfully = createAction(
    '[BodyShopLocations] bodyShopLocation added successfully',
    props<{ data: ILocation }>()
  );

  static editBodyShopLocation = createAction(
    '[BodyShopLocation] Editing BodyShopLocation',
    props<{ bodyShopLocation: any }>()
  );

  static bodyShopLocationEditedSuccessfully = createAction(
    '[BodyShopLocation] BodyShopLocation Edited Successfully',
    props<{ bodyShopLocation: any }>()
  );
  static resetParams = createAction('[BodyShopLocations] Reset Parameters');
  static error = createAction(
    '[bodyShopLocation] error occurred',
    props<{ reason: any }>()
  );
}
