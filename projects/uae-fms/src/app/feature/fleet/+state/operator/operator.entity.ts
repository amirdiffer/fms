import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';


export const FLEET_OPERATOR_FEATURE_KEY = 'operator';

export interface IOperatorStateModel{
    operator:{
        name:string;
        employeNumber: string;
    }
    organization: string;
    info:{
        email: string;
        phoneNmber: string;
    }
    type:string;
    status:string;
    asset:{
        assetName:string;
        dpd:string;
        ownership: string;
        tFPaid: string;
    }
}

export interface IOperatorState extends EntityState<IOperatorStateModel>{
    error?: any;
    loaded?: boolean;
    message?: string; 
}

export interface IOperatorPartialState{
    [FLEET_OPERATOR_FEATURE_KEY] : IOperatorState;
}

export const operatorAdapter :  EntityAdapter<IOperatorStateModel> = createEntityAdapter<IOperatorStateModel>();

export const initialState :IOperatorState = operatorAdapter.getInitialState({
    error: null,
    loaded: null,
    message: null
} as IOperatorState );