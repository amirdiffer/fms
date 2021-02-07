export interface LoginRequest {
  firstName?: string;
  fleetManager?: boolean;
  lastName?: string;
  password: string;
  username: string;
}

export interface LoginResponse {
  fleetUser: FleetUser;
  token: string;
  role: string;
}

export interface FleetUser {
  username: string;
  firstName: string;
  lastName: string;
  fleetManager: boolean;
}
