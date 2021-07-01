export interface IJobCard {
  id?:number;
  assetId?:number;
  assetDpd?:string;
  creatorId?:number;
  description: string;
  location?: {
    id:number;
    address?:string;
    thirdPartyLocationId:string;
  };
  startDate?:string;
  endDate?:string;
  cost?:string;
  status?:string;
  tasks: IJobcardTask[];
}
export interface IJobcardTask{
  id?:number;
  technicianId?:number;
  priorityOrder?:number;
  taskMaster?:{
    id?:number;
    shopType:string;
    taskType:string;
    name:string;
    instruction:string;
    timeEstimate:number;
    ratePerHour:number;
    skills:Skill[],
    doesNeedParty:boolean
  }
}

export interface Task {
  taskMasterId: number;
  priorityOrder: number;
  technicianId: number;
}

export interface IRequest {
  id: number;
  asset: Asset;
  gpsMeterSource: string;
  hasAccident: boolean;
  accidentType: string;
  jobType: string;
  reportedBy: string;
  request: string;
  description: string;
  documentIds: number[];
  creatorId: number;
  approveStatus: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
}

export interface Asset {
  id: number;
  dpd: string;
}

export interface ITechnician {
  id: number;
  user: User;
  payPerHour: number;
  skills: Skill[];
  numOfTasks: number;
  locations?:any[];

}

export interface Skill {
  id?: number;
  name: string;
}

export interface User {
  id: number;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  userName?:string;
  profileDocId: number;
  department: Department;
  emails: string[];
  phoneNumbers: string[];
  isActive: boolean;
  role: Role;
}

export interface Department {
  id: number;
  name: string;
  organizationId: number;
  organizationName: string;
}

export interface Role {
  roleId: number;
  roleName: string;
}

export interface ILocation {
  id: number;
  locationThirdPartyId: string;
  address: string;
  slots: Slot[];
  services: string[];
  numOfSlots: number;
  numOfJobCards: number;
  numOfTechnicians: number;
  capacity: number;
}

export interface Slot {
  id: number;
  thirdPartySlotId: string;
}


/* Get a list of request related to a specific asset */
export interface IRequestListSpecificAsset{
  id:number;
  request:string;
  description:string;
  reportedBy:string;
  creator:ICreator;
  hasAccident:boolean;
  accidentType:string;
  jobType:string;
  documentIds:number[];
  approveStatus:string;
  createdAt:string;
  updatedAt:string;
  deletedAt:string;
}
export interface ICreator {
  id:number;
  firstName:string;
  lastName:string;
}