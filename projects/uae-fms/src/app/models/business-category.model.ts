import { IGeneralResponse } from '@models/general-response';

export interface IBusinessCategory extends IGeneralResponse {
  id: number;
  name: string;
  status: string;
  description: string;
  assetTypeId: number;
  assetTypeName: string;
  numOfSubAssets: number;
  numOfAccessories: number;
  assetConfigurationId: number;
  numOfSubAssetConfigurations: number;
  numOfAccessoryConfigurations: number;
  accessories?: any[];
  subAssets?: any[];
}

export interface IBusinessCategoryPostModel {
  name: string;
  assetTypeId: number;
  status: string;
  description: string;
  subAssets: [
    {
      subAssetId: number;
      quantity: number;
      specDocId: number;
    }
  ];
  accessories: [
    {
      accessoryId: number;
      quantity: number;
      specDocId: number;
    }
  ];
}
