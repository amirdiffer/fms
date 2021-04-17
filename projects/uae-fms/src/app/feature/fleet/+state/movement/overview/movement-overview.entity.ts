import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const FLEET_MOVEMENT_OVERVIEW_FEATURE_KEY = 'movementOverview';

export interface MovementOverviewStateModel {
  "id": number,
  "request": {
    "id": number,
    "startDate": string,
    "endDate": string,
    "reason": string
  },
  "asset": {
    "id": number,
    "dpd": string,
    "tfPaid": number,
    "tfUnpaid": number
  },
  "operator": {
    "id": number,
    "firstName": string,
    "lastName": string
  },
  "department": {
    "id": number,
    "name": string,
    "organizationId": number,
    "organizationName": string
  },
  "comment": string,
  "gpsMeterSource": string,
  "shouldSendNotification": boolean,
  "hasFuelCard": boolean,
  "fuelCardSerialNumber": string,
  "createdAt": string,
  "updatedAt": string,
  "deletedAt": null
}

export interface MovementOverviewState
  extends EntityState<MovementOverviewStateModel> {
  error?: any;
  loaded?: boolean;
  message?: string;
  resultNumber?:number
}

export interface MovementOverviewPartialState {
  [FLEET_MOVEMENT_OVERVIEW_FEATURE_KEY]: MovementOverviewState;
}

export const movementOverviewAdapter: EntityAdapter<MovementOverviewStateModel> = createEntityAdapter<
  MovementOverviewStateModel
>();

export const initialState: MovementOverviewState = movementOverviewAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null,
    resultNumber:0
  } as MovementOverviewState
);
