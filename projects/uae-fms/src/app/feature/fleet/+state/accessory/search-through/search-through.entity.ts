import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";


export const FLEET_ACCESSORY_SEARCH_THROUGH_FEATURE_KEY = 'accessorySearchThrough';

export interface IAccessorySearchThrough {
    name:string;
    id:number
}


export interface IAccessorySearchThroughState extends EntityState<IAccessorySearchThrough> {
    error?: any;
    loaded?: boolean;
    message?: string;
}


export const accessorySearchThroughAdapter: EntityAdapter<IAccessorySearchThrough> = createEntityAdapter<IAccessorySearchThrough>();


export const initialState: IAccessorySearchThroughState = accessorySearchThroughAdapter.getInitialState(
    {
      loaded: null,
      message: null,
      error: null,
    } as IAccessorySearchThroughState
  );
