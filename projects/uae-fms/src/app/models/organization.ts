export interface IOrganization {
  id: number;
  organizationNumber: number;
  organizationName: string;
  tags: string[];
  departments: Department[];
  trafficFine: TrafficFine;
  numOfDepartments: number;
  numOfLocations: number;
  numOfUsers: number;
  numOfAssets: number;
  numOfMovements: number;
  numOfMovementsThisMonth: number;
  tfPaid: number;
  tfUnpaid: number;
}

export interface Department {
  id: number;
  name: string;
  locationAddresses: string[];
  numOfMovements: number;
  numOfMovementsThisMonth: number;
  numOfUsers: number;
  numOfAssets: number;
  tfPaid: number;
  tfUnpaid: number;
}

export interface TrafficFine {
  totalTrafficFines: number;
  paidTrafficFines: number;
  unpaidTrafficFines: number;
}
