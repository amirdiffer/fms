export interface IPartMasterItem{
    assetConfigurationId?:number;
    assetConfigurationName?:string;
    categoryId?:number;
    categoryName?:string;
    description?:string;
    documentId?:number;
    id?:number;
    makeId?:number;
    makeName?:string;
    modelId?:number;
    modelName?:string;
    name?:string;
    suppliers?:IPartMasterSupplier[];
    trimColorId?:number;
    trimColorName?:string;
    trimId?:number;
    trimName?:string;
}

export interface IPartMasterSupplier {
    id?:number;
    companyName?:string;
}