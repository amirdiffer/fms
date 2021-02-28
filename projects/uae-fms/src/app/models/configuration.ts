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
  roleName: string;
  serviceName: string;
  permissionValue: string;
}
