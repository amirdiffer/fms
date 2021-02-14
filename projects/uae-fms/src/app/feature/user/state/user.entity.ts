import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const USER_PROFILE_FEATURE_KEY = 'userProfile';

export interface IUserProfileModel {
  firstName: string;
  fleetManager: boolean;
  lastName: string;
  userName: string;
}

export interface IUserProfileState extends EntityState<IUserProfileModel> {
  loaded: boolean;
  error?: any;
  message: string;
}

export const userProfileAdapter: EntityAdapter<IUserProfileModel> = createEntityAdapter<
  IUserProfileModel
>();
export const initialState: IUserProfileState = userProfileAdapter.getInitialState(
  {
    loaded: null,
    error: null,
    message: null
  } as IUserProfileState
);
