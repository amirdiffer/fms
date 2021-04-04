import { IGeneralResponse } from '@models/general-response';

export interface IProfile {
  role: {
    id: number;
    permissions: {
      asset: number;
      subAsset: number;
      organization: number;
      accessory: number;
      movement: number;
      fuelManagement: number;
      trafficFine: number;
      toll: number;
      workshop: number;
      partstore: number;
    };
  };
  profile: {
    userId: number;
    firstName: string;
    lastName: string;
    roleId: number;
    employeeNumber: string;
    organizationId: number;
    departmentId: number;
    email: string;
    phoneNumber: string;
    notificationType: string;
    vehicleComments: boolean;
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
  };
}
