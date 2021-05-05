import { createAction, props } from '@ngrx/store';
import { PartMasterStateModel } from './part-master.entity';

export class PartMasterActions {

  /* --------- Asset Part -------------- */
  /* Category of Asset */
  static getCategoryOfAsset = createAction(
    '[PartMaster] load all category of asset',
    props<{ id: number }>()
  );

  static categoryOfAssetLoaded = createAction(
      '[PartMaster] all category of asset are loaded',
      props<{ data: any[] }>()
  );
  
  static getSpecificCategoryOfAsset = createAction(
    '[PartMaster] load specific category of asset',
    props<{ id: number }>()
  );

  static specificCategoryOfAssetLoaded = createAction(
      '[PartMaster] specific category of asset are loaded',
      props<{ data: any[] }>()
  );

  static addCategoryOfAsset = createAction(
    '[PartMaster] add category of asset',
    props<{ data: any }>()
  );

  static categoryOfAssetAddedSuccessfully = createAction(
    '[PartMaster] category of asset added successfully',
    props<{ data: any }>()
  );
  
  static updateCategoryOfAsset = createAction(
    '[PartMaster] update category of asset',
    props<{ data: any }>()
  );

  static categoryOfAssetUpdatedSuccessfully = createAction(
    '[PartMaster] category of asset updated successfully',
    props<{ data: any }>()
  );

  /* Item of Asset */

  static getItemOfAsset = createAction(
    '[PartMaster] load all items of asset',
    props<{ id: number }>()
  );
  
  static itemOfAssetLoaded = createAction(
    '[PartMaster] all items of asset are loaded',
    props<{ data: any[] }>()
  );
  
  static getSpecificItemOfAsset = createAction(
    '[PartMaster] load specific item of asset',
    props<{ id: number }>()
  );

  static specificItemOfAssetLoaded = createAction(
      '[PartMaster] specific item of asset are loaded',
      props<{ data: any[] }>()
  );

  static addItemOfAsset = createAction(
    '[PartMaster] add item of asset',
    props<{ data: any }>()
  );

  static itemOfAssetAddedSuccessfully = createAction(
    '[PartMaster] item of asset added successfully',
    props<{ data: any }>()
  );

  static updateItemOfAsset = createAction(
    '[PartMaster] update item of asset',
    props<{ data: any }>()
  );

  static itemOfAssetUpdatedSuccessfully = createAction(
    '[PartMaster] item of asset updated successfully',
    props<{ data: any }>()
  );



  /* --------- Sub Asset Part -------------- */
  /* Category of Sub Asset */
  static getCategoryOfSubAsset = createAction(
    '[PartMaster] load all category of sub asset',
    props<{ id: number }>()
  );

  static categoryOfSubAssetLoaded = createAction(
      '[PartMaster] all category of sub asset are loaded',
      props<{ data: any[] }>()
  );
  
  static getSpecificCategoryOfSubAsset = createAction(
    '[PartMaster] load specific category of sub asset',
    props<{ id: number }>()
  );

  static specificCategoryOfSubAssetLoaded = createAction(
      '[PartMaster] specific category of sub asset are loaded',
      props<{ data: any[] }>()
  );

  static addCategoryOfSubAsset = createAction(
    '[PartMaster] add category of sub asset',
    props<{ data: any }>()
  );

  static categoryOfSubAssetAddedSuccessfully = createAction(
    '[PartMaster] category of sub asset added successfully',
    props<{ data: any }>()
  );
  
  static updateCategoryOfSubAsset = createAction(
    '[PartMaster] update category of sub asset',
    props<{ data: any }>()
  );

  static categoryOfSubAssetUpdatedSuccessfully = createAction(
    '[PartMaster] category of sub asset updated successfully',
    props<{ data: any }>()
  );

  /* Item of Sub Asset */

  static getItemOfSubAsset = createAction(
    '[PartMaster] load all items of sub asset',
    props<{ id: number }>()
  );
  
  static itemOfSubAssetLoaded = createAction(
    '[PartMaster] all items of sub asset are loaded',
    props<{ data: any[] }>()
  );
  
  static getSpecificItemOfSubAsset = createAction(
    '[PartMaster] load specific item of sub asset',
    props<{ id: number }>()
  );

  static specificItemOfSubAssetLoaded = createAction(
      '[PartMaster] specific item of sub asset are loaded',
      props<{ data: any[] }>()
  );

  static addItemOfSubAsset = createAction(
    '[PartMaster] add item of sub asset',
    props<{ data: any }>()
  );

  static itemOfSubAssetAddedSuccessfully = createAction(
    '[PartMaster] item of sub asset added successfully',
    props<{ data: any }>()
  );

  static updateItemOfSubAsset = createAction(
    '[PartMaster] update item of sub asset',
    props<{ data: any }>()
  );

  static itemOfSubAssetUpdatedSuccessfully = createAction(
    '[PartMaster] item of sub asset updated successfully',
    props<{ data: any }>()
  );




  static loadAll = createAction('[PartMaster] load all data');

  static allDataLoaded = createAction(
    '[PartMaster] all datas are loaded',
    props<{ data: PartMasterStateModel[] }>()
  );

  static error = createAction(
    '[PartMaster] error occurred',
    props<{ reason: any }>()
  );
}
