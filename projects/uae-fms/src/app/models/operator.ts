import { IDepartment } from './configuration';

export interface IOperator {
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
  role: { roleId: number; roleName: string };
  roleName: string;
  notifyByEmail: boolean;
  notifyByPush: boolean;
  notifyByCall: boolean;
  notifyBySMS: boolean;
  notifyByWhatsApp: boolean;
  vehicleComments;
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

export interface IOperatorDrivingLicense {
  country: string;
  dateOfExpiry: number;
  docId: number;
  licenseClass: string;
  number: string;
}

export interface IOperatorTrafficFine {
  department: IOperatorDepartment;
  missionStatus: string;
  plateNumber: string;
  tcCode: number;
  time: number;
  type: string;
  userStatus: string;
}

export interface IOperatorDepartment {
  id: number;
  name: string;
  organizationId: number
  organizationName: string;
}

export interface IOperatorMovementHistory {
  asset: IOperatorMovementHistoryAsset
  department: IOperatorDepartment;
  startDate: number;
  endDate: number;
}

export interface IOperatorMovementHistoryAsset {
  id: number;
  avatarId: number;
  dpd: string;
  ownershipType: string;
}
