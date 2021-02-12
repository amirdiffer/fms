export interface IOperator {
  employeeId: number;
  organizationId: number;
  departmentId: number;
  authorizedId: number;
  expiryLicenseDate: string;
  isEmployeeStatusActive: boolean;
  profilePictureId: number;
  firstName: string;
  lastName: string;
  email: string[];
  phoneNumber: string[];
  sendNotificationBySMS: boolean;
  sendNotificationByEmail: boolean;
  sendNotificationByWhatsapp: boolean;
}
