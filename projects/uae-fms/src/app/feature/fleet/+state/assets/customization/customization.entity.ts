import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ICustomizationModel {
  asset: {
    img: string,
    assetName: string,
    assetSubName: string,
    progress: number
  },
  serialNumber: string,
  brand: string,
  type: string,
  businessCategory: string,
  createDate: string,
  registrantionDate: string,
  creator: string
}

export interface ICustomizationState extends EntityState<ICustomizationModel> {
  error?: any;
  loaded: boolean;
  message: string;
}

export const FLEET_CUSTOMIZATION_FEATURE_KEY = 'customization';

export interface ICustomizationPartialState {
  [FLEET_CUSTOMIZATION_FEATURE_KEY]: ICustomizationState;
}

export const customizationAdapter: EntityAdapter<ICustomizationModel> = createEntityAdapter<
  ICustomizationModel
>();

export const initialState: ICustomizationState = customizationAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    error: null
  } as ICustomizationState
);
