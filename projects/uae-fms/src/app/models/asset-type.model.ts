export interface IAssetType {
  id: number;
  name: string;
  type: string;
  typeDescription: string;
  isActive: false;
  makes: Make[];
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
  trims: MakeModelTrim[];
}

export interface MakeModelTrim {
  id: number;
  trim: string;
  colors: MakeModelTrimColor[];
}

export interface MakeModelTrimColor {
  id: number;
  color: string;
  hexColor:string;
}
