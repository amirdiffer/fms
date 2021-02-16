import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface IRegistrationModel {
  asset: {
    img: string,
    assetName: string,
    assetSubName: string,
    progress: number
  },
  serialNumber: string,
  brand: string,
  type: string,
  businessCategory: string,
  createDate: string,
  registrantionDate: string,
  creator: string
}

export interface IRegistrationState extends EntityState<IRegistrationModel> {
  error?: any;
  loaded: boolean;
  message: string;
}

export const FLEET_REGISTRATION_FEATURE_KEY = 'registration';

export interface IRegistrationPartialState {
  [FLEET_REGISTRATION_FEATURE_KEY]: IRegistrationState;
}

export const registrationAdapter: EntityAdapter<IRegistrationModel> = createEntityAdapter<
  IRegistrationModel
>();

export const initialState: IRegistrationState = registrationAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    error: null
  } as IRegistrationState
);
