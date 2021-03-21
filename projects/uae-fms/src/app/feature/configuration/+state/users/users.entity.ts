import { IUser } from '@models/configuration';
import { IUserStatistics } from '@models/statistics';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const CONFIGURATION_USERS_FEATURE_KEY = 'users';

export interface UsersState extends EntityState<IUser> {
  error?: any;
  loaded: boolean;
  message?: string;
  statistics?: IUserStatistics;
}

export interface UsersPartialState {
  [CONFIGURATION_USERS_FEATURE_KEY]: UsersState;
}

export const usersAdapter: EntityAdapter<IUser> = createEntityAdapter<IUser>();

export const initialState: UsersState = usersAdapter.getInitialState({
  loaded: null,
  message: null,
  error: null,
  statistics: null
} as UsersState);
