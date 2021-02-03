export interface AuthState {
  isAuthenticated: boolean;
  token?: string;
  user?: IUSer;
}

export interface IUSer {
  first_name?: string;
  last_name?: string;
  username?: string;
  role?: string;
  group?: IGroup[];
}

export interface IGroup {
  name?: string; // example User Management
  actions?: string[]; // example ['create', 'read', 'edit', 'delete']
}
