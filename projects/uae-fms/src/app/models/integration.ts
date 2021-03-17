export interface IIntegration {
  id?: number;
  name?: string;
  type: string;
  companyName: string;
  grp: string;
  isConnected?: boolean;
  email?: string;
  phoneNumber?: string;
  supportOperator?: {
    id: number;
    firstName: string;
    lastName: string;
  };
}
