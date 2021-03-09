import { Department } from './organization';

export interface IUser {
  id: number;
  employeeNumber: number;
  firstName: string;
  lastName: string;
  profileDocId: number;
  organizationId: number;
  department: IDepartment;
  emails: string[];
  phoneNumbers: string[];
  isActive: boolean;
  roleId: number;
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

export interface IOwnerShip {
  id?: number;
  type: string;
  name: string;
  email: string;
  phoneNumber: string;
  purpose: string;
  fleetITCode: string;
  duration: number;
  totalAssetCount?: string;
}

export interface IPeriodicService {}

export interface IDepartment {
  id: number;
  name: string;
  organizationId: number;
  organizationName: string;
}
