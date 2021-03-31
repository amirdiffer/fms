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
  role: { roleId: number; roleName: string; }
  roleName: string;
  notifyByEmail: boolean;
  notifyByPush: boolean;
  notifyByCall: boolean;
  notifyBySMS: boolean;
  notifyByWhatsApp: boolean;
  vehicleComments
  serviceEntryComment: boolean;
  fuelEntryComments: boolean;
  vehicleStatusChanges: boolean;
  voidedFuelEntries: boolean;
  dueSoonInspections: boolean;
  overdueInspections: boolean;
  newFaults: boolean;
  newRecalls: boolean;
  notifyByNewIssueEmail: boolean;
  notifyByNewIssuePush: boolean;
  notifyByIssueAssignedEmail: boolean;
  notifyByIssueAssignedPush: boolean;
  notifyByCommentOnIssueEmail: boolean;
  notifyByCommentOnIssuePush: boolean;
  notifyByIssueResolvedEmail: boolean;
  notifyByIssueResolvedPush: boolean;
  notifyByIssueCloseEmail: boolean;
  notifyByIssueClosePush: boolean;
}

export interface IRole {
  id: number;
  roleId: number;
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
  numOfOwnedAssets?: number;
}

export interface IPeriodicService {
  id: number;
  name: string;
  numOfUsage?:number;
}

export interface IDepartment {
  id: number;
  name: string;
  organizationId: number;
  organizationName: string;
}
