export interface IAssetType {
  id: number;
  name: string;
  type?: string;
  description: string;
  isActive: false;
  makes?: Make[];
}


export interface Make {
  id: number;
  make: string;
  models: MakeModel[];
  makeDescription: string;
  totalMakeCount: number;
}

export interface MakeModel {
  id: number;
  model: string;
  modelDescription:string;
  trims?: MakeModelTrim[];
}

export interface MakeModelTrim {
  id: number;
  trim?: string;
  name?: string;
  colors: MakeModelTrimColor[];
}

export interface MakeModelTrimColor {
  id: number;
  color: string;
  hexColor:string;
}



export interface IMake {
  id?:number;
  name?:string;
  description?:string;
  models?:IModel[]
}

export interface IModel {
  id?:number;
  name?:string;
  description?:string;
  trims:Itrim[]
}

export interface Itrim{
  id?:number;
  colors?:IColor[];
  name?:string;
}

export interface IColor{
  id?:number;
  name?:string;
  hexColor?:string;
}