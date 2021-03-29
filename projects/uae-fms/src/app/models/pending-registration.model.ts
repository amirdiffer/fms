export interface IPendingRegistration {
  id?: number;
  avatarId?: number;
  dpd?: string;
  plateNumber?:number;
  status?:string;
  department?:IDepartment;
  operator?:IOperator;
  assetTypeId?:number;
  assetTypeName?:string;
  makeId?:number;
  makeName?:string;
  modelId?:number;
  modelName?:string;
  year?:string;
  trimId?:number;
  trimName?:string;
  colorId?:number;
  colorName?:string;
  tollId?:number;
  fuelCardId?:number;
}

export interface IOperator {
  id?: number;
  firstName?: string;
  lastName?: string;
}

export interface IDepartment {
  id?: number;
  name?: string;
  organizationId?: number;
  organizationName?: string;
}
