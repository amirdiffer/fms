import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";


export const WORKSHOP_BODYSHOP_TECHNICIAN_FEATURE_KEY = 'bodyShopTechnician';

export interface IBodyShopTechnicianStateModel{
    name:{
        fullname: string;
        number:string;
        thumb: string;
    }
    skill:string;
    status:string;
    tasks:number;
    info:{
        email:string;
        phone:string;
    }
    ratePerHour: string;
}

export interface IBodyShopTechnicianState extends EntityState<IBodyShopTechnicianStateModel> {
    error?: any;
    loaded: boolean;
    message: string;
}
export interface IBodyShopTechnicianPartialState {
    [WORKSHOP_BODYSHOP_TECHNICIAN_FEATURE_KEY]: IBodyShopTechnicianState;
}
export const bodyShopTechnicianAdapter: EntityAdapter<IBodyShopTechnicianStateModel> = createEntityAdapter<IBodyShopTechnicianStateModel>();
export const initialState: IBodyShopTechnicianState = bodyShopTechnicianAdapter.getInitialState({
    loaded: null,
    message: null,
    error: null
  } as IBodyShopTechnicianState);