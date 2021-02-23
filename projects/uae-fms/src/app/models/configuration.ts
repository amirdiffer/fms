export interface IUser {
  id: number;
  employeeNumber: number;
  organizationId: number;
  departmentId: number;
  roleId: number;
  isActive: boolean;
  profileDocId: number;
  firstName: string;
  lastName: string;
  emails: string[];
  phoneNumbers: string[];
  notifyByEmail: boolean;
  notifyByPush: boolean;
  notifyByCall: boolean;
  notifyBySMS: boolean;
  notifyByWhatsApp: boolean;
}

export interface IRole {
  id: number;
  roleId: string;
  roleName: string;
}
