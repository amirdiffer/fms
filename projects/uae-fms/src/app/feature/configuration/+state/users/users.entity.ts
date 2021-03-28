import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const CONFIGURATION_USERS_FEATURE_KEY = 'users';

export interface UsersStateModel {
  userItem: {
    name: string;
    id: string;
    thumb: string;
  };
  departmentItem: {
    departmentName: string;
    sectionName: string;
  };
  informationItem: {
    email: string;
    tel: string;
  };
  status: string;
  role: string;
}

export interface UsersState extends EntityState<UsersStateModel> {
  error?: any;
  loaded: boolean;
  message: string;
}

export interface UsersPartialState {
  [CONFIGURATION_USERS_FEATURE_KEY]: UsersState;
}

export const usersAdapter: EntityAdapter<UsersStateModel> = createEntityAdapter<
  UsersStateModel
>();

export const initialState: UsersState = usersAdapter.getInitialState({
  loaded: null,
  message: null,
  error: null
} as UsersState);
