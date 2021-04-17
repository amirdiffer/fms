import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ITechnician } from '@models/body-shop';

export const WORKSHOP_SERVICESHOP_TECHNICIAN_FEATURE_KEY = 'serviceShopTechnician';

export interface IServiceShopTechnicianState extends EntityState<ITechnician> {
  error?: any;
  loaded: boolean;
  message: string;
  submitted: boolean;
  resultNumber?:number

}
export interface IServiceShopTechnicianPartialState {
  [WORKSHOP_SERVICESHOP_TECHNICIAN_FEATURE_KEY]: IServiceShopTechnicianState;
}
export const serviceShopTechnicianAdapter: EntityAdapter<ITechnician> = createEntityAdapter<
  ITechnician
>();
export const initialState: IServiceShopTechnicianState = serviceShopTechnicianAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    error: null,
    submitted: false,
    resultNumber:0

  } as IServiceShopTechnicianState
);
