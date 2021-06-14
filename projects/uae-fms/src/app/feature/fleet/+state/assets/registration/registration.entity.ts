import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IPendingRegistration } from '@models/pending-registration.model';

export interface IRegistrationModel {
  asset: {
    img: string;
    assetName: string;
    assetSubName: string;
    progress: number;
  };
  serialNumber: string;
  brand: string;
  type: string;
  businessCategory: string;
  createDate: string;
  registrantionDate: string;
  creator: string;
}

export interface IRegistrationState extends EntityState<IPendingRegistration> {
  error?: any;
  loaded: boolean;
  message: string;
  submitted: boolean;
  resultNumber?: number;
  assetForRegistration: any;
  
}

export const FLEET_REGISTRATION_FEATURE_KEY = 'registration';

export interface IRegistrationPartialState {
  [FLEET_REGISTRATION_FEATURE_KEY]: IRegistrationState;
}

export const registrationAdapter: EntityAdapter<IPendingRegistration> = createEntityAdapter<
  IPendingRegistration
>();

export const initialState: IRegistrationState = registrationAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    error: null,
    submitted: false,
    resultNumber: 0,
    assetForRegistration: null,
  } as IRegistrationState
);

export interface IRegisterAssetByPlateNumber{
  id?:number;
  plateCategory?:string;
  plateCode?:string;
  plateNumber?:string;
  plateSource?:string;
  fuelTag?:string;
  tollTag?:string;
}

export interface IRegisterAssetByChassisNumber{
  id?:number;
  chassisNumber?:string;
  fuelTag?:string;
  tollTag?:string;
}
