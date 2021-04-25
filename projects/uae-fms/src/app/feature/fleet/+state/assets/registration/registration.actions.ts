import { createAction, props } from '@ngrx/store';
import { IPendingRegistration } from '@models/pending-registration.model';

export class RegistrationActions {
  static loadAll = createAction('[Registration] load all data');

  static allDataLoaded = createAction(
    '[Registration] all datas are loaded',
    props<{ data: IPendingRegistration[] }>()
  );
  static count = createAction(
    '[Registration] get result number',
    props<{ data: number }>()
  );
  static registerAsset = createAction(
    '[Registration] register an asset',
    props<{ data: any }>()
  );
  static editRegister = createAction(
    '[Registration] edit register',
    props<{ register: any }>()
  );
  static registerEditedSuccessfully = createAction(
    '[Registration] register edited successfully',
    props<{ register: any }>()
  );
  static assetRegisterSuccessfull = createAction(
    '[Registration] asset registered successfully ',
    props<{ data: any }>()
  );
  static loadAssetForRegistrationByAssetId = createAction(
    '[Registration] load asset for registration by assetId',
    props<{ assetId: number }>()
  );
  static AssetForRegistrationByAssetIdLoaded = createAction(
    '[Registration]  asset for registration by assetId is loaded',
    props<{ data: any }>()
  );
  static error = createAction(
    '[Registration] error occurred',
    props<{ reason: any }>()
  );
  static resetParams = createAction('[Registration] reset parameters');
}
