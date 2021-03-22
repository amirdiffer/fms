import { IGeneralResponse } from '@models/general-response';

export interface IBusinessCategory extends IGeneralResponse {
  id: number;
  name: string;
  status: string;
  description: string;
  assetTypeId: number;
  numOfSubAssets: number;
  numOfAccessories: number;
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
