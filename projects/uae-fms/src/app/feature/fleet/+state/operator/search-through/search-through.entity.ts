import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";


export const FLEET_OPERATOR_SEARCH_THROUGH_FEATURE_KEY = 'operatorSearchThrough';

export interface IOperatorSearchThrough {
    name:string;
    id:number
}


export interface IOperatorSearchThroughState extends EntityState<IOperatorSearchThrough> {
    error?: any;
    loaded?: boolean;
    message?: string;
}


export const operatorSearchThroughAdapter: EntityAdapter<IOperatorSearchThrough> = createEntityAdapter<IOperatorSearchThrough>();


export const initialState: IOperatorSearchThroughState = operatorSearchThroughAdapter.getInitialState(
    {
      loaded: null,
      message: null,
      error: null,
    } as IOperatorSearchThroughState
  );
