import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ITechnician } from '@models/body-shop';

export const WORKSHOP_BODYSHOP_TECHNICIAN_FEATURE_KEY = 'bodyShopTechnician';

export interface IBodyShopTechnicianState extends EntityState<ITechnician> {
  error?: any;
  loaded: boolean;
  message: string;
  submitted: boolean;
  resultNumber?: number;
}
export interface IBodyShopTechnicianPartialState {
  [WORKSHOP_BODYSHOP_TECHNICIAN_FEATURE_KEY]: IBodyShopTechnicianState;
}
export const bodyShopTechnicianAdapter: EntityAdapter<ITechnician> = createEntityAdapter<
  ITechnician
>();
export const initialState: IBodyShopTechnicianState = bodyShopTechnicianAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    error: null,
    submitted: false,
    resultNumber: 0
  } as IBodyShopTechnicianState
);
