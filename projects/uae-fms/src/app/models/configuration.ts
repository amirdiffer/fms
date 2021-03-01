export interface IUser {
  id: number;
  employeeNumber: number;
  firstName: string;
  lastName: string;
  profileDocId: number;
  organizationId: number;
  departmentId: number;
  emails: string[];
  phoneNumbers: string[];
  isActive: boolean;
  roleId: number;
}

export interface IRole {
  id: number;
  roleId: string;
  roleName: string;
}

export interface IOwnerShip {
  id: number,
  name: string
}


export interface IPeriodicService {}
