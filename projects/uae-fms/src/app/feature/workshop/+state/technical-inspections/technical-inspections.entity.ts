import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ITechnicalInspectionModel {
  item: {
    title: string;
    dpd: string;
    thumb: string;
  };
  status: string;
  source: string;
  reporter: string;
  cost: string;
  insuranceValue: string;
  inturanceAction: string;
}

export interface ITechnicalInspectionState
  extends EntityState<ITechnicalInspectionModel> {
  error?: any;
  loaded: boolean;
  message: string;
}

export const WORKSHOP_TECHNICAL_INSPECTION_FEATURE_KEY = 'technicalInspection';
export interface ITechnicalInspectionPartialState {
  [WORKSHOP_TECHNICAL_INSPECTION_FEATURE_KEY]: ITechnicalInspectionState;
}

export const technicalInspectionAdapter: EntityAdapter<ITechnicalInspectionModel> = createEntityAdapter<
  ITechnicalInspectionModel
>();

export const initialState: ITechnicalInspectionState = technicalInspectionAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as ITechnicalInspectionState
);
