export interface IOrganization {
  id: number;
  organizationNumber: number;
  organizationName: string;
  tags: string[];
  departments: Department[];
  numOfDepartments: number;
  numOfLocations: number;
  numOfUsers: number;
  numOfAssets: number;
  tfPaid: number;
  tfUnpaid: number;
}

export interface Department {
  id: number;
  name: string;
  locationAddress: string[];
}
