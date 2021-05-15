export interface Make {
  id: number;
  name: string;
  models: MakeModel[];
  description: string;
  totalMakeCount: number;
}

export interface IAssetType {
  id: number;
  name: string;
  type?: string;
  description: string;
  isActive: false;
  makes?: Make[];
}


/* export interface Make {
  id: number;
  make: string;
  models: MakeModel[];
  makeDescription: string;
  totalMakeCount: number;
} */

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



export interface IAssetType {
  id: number;
  name: string;
  type?: string;
  description: string;
  isActive: false;
  makes?: Make[];
}



export interface MakeModel {
  id: number;
  name: string;
  description:string;
  trims?: MakeModelTrim[];
}

export interface MakeModelTrim {
  id: number;
  trim?: string;
  name?: string;
  colors: MakeModelTrimColor[];
  description: string
  origins: string[]
}

export interface MakeModelTrimColor {
  id: number;
  name: string;
  hexColor:string;
}
