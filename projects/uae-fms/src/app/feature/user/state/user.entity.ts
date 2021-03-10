import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IProfile } from '@models/profile';

export const USER_PROFILE_FEATURE_KEY = 'userProfile';

export interface IUserProfileState extends EntityState<IProfile> {
  loaded: boolean;
  error?: any;
  message: string;
  profile: object;
}

export const userProfileAdapter: EntityAdapter<IProfile[]> = createEntityAdapter<
  IProfile[]
>();
export const initialState: IUserProfileState = userProfileAdapter.getInitialState(
  {
    loaded: null,
    error: null,
    message: null,
    profile: null
  } as IUserProfileState
);
