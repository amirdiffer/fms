import { createAction, props } from '@ngrx/store';

export class PartMasterActions {

  /* --------- Asset Part -------------- */

  /* Category of Asset */
  static getCategoryOfAsset = createAction(
    '[PartMasterCategory] load all category of asset',
    props<{ id: number }>()
  );

  static categoryOfAssetLoaded = createAction(
      '[PartMasterCategory] all category of asset are loaded',
      props<{ data: any[] }>()
  );
  
  static getSpecificCategoryOfAsset = createAction(
    '[PartMasterCategory] load specific category of asset',
    props<{ id: number }>()
  );

  static specificCategoryOfAssetLoaded = createAction(
      '[PartMasterCategory] specific category of asset are loaded',
      props<{ data: any[] }>()
  );

  static updateCategoryOfAsset = createAction(
    '[PartMasterCategory] update category of asset',
    props<{ data: any }>()
  );

  static categoryOfAssetUpdatedSuccessfully = createAction(
    '[PartMasterCategory] category of asset updated successfully',
    props<{ data: any }>()
  );




  /* Item of Asset */

  static getItemOfAsset = createAction(
    '[PartMasterItem] load all items of asset',
    props<{ id: number }>()
  );
  
  static itemOfAssetLoaded = createAction(
    '[PartMasterItem] all items of asset are loaded',
    props<{ data: any[] }>()
  );
  
  static getSpecificItemOfAsset = createAction(
    '[PartMasterItem] load specific item of asset',
    props<{ id: number }>()
  );

  static specificItemOfAssetLoaded = createAction(
      '[PartMasterItem] specific item of asset are loaded',
      props<{ data: any[] }>()
  );

  static addItemOfAsset = createAction(
    '[PartMasterItem] add item of asset',
    props<{ data: any }>()
  );

  static itemOfAssetAddedSuccessfully = createAction(
    '[PartMasterItem] item of asset added successfully',
    props<{ data: any }>()
  );

  static updateItemOfAsset = createAction(
    '[PartMasterItem] update item of asset',
    props<{ data: any }>()
  );

  static itemOfAssetUpdatedSuccessfully = createAction(
    '[PartMasterItem] item of asset updated successfully',
    props<{ data: any }>()
  );




  /* --------- Sub Asset Part -------------- */

  /* Category of Sub Asset */
  static getCategoryOfSubAsset = createAction(
    '[PartMasterCategory] load all category of sub asset',
    props<{ id: number }>()
  );

  static categoryOfSubAssetLoaded = createAction(
      '[PartMasterCategory] all category of sub asset are loaded',
      props<{ data: any[] }>()
  );
  
  static getSpecificCategoryOfSubAsset = createAction(
    '[PartMasterCategory] load specific category of sub asset',
    props<{ id: number }>()
  );

  static specificCategoryOfSubAssetLoaded = createAction(
      '[PartMasterCategory] specific category of sub asset are loaded',
      props<{ data: any[] }>()
  );

  static updateCategoryOfSubAsset = createAction(
    '[PartMasterCategory] update category of sub asset',
    props<{ data: any }>()
  );

  static categoryOfSubAssetUpdatedSuccessfully = createAction(
    '[PartMasterCategory] category of sub asset updated successfully',
    props<{ data: any }>()
  );




  /* Item of Sub Asset */

  static getItemOfSubAsset = createAction(
    '[PartMasterItem] load all items of sub asset',
    props<{ id: number }>()
  );
  
  static itemOfSubAssetLoaded = createAction(
    '[PartMasterItem] all items of sub asset are loaded',
    props<{ data: any[] }>()
  );
  
  static getSpecificItemOfSubAsset = createAction(
    '[PartMasterItem] load specific item of sub asset',
    props<{ id: number }>()
  );

  static specificItemOfSubAssetLoaded = createAction(
      '[PartMasterItem] specific item of sub asset are loaded',
      props<{ data: any[] }>()
  );

  static addItemOfSubAsset = createAction(
    '[PartMasterItem] add item of sub asset',
    props<{ data: any }>()
  );

  static itemOfSubAssetAddedSuccessfully = createAction(
    '[PartMasterItem] item of sub asset added successfully',
    props<{ data: any }>()
  );

  static updateItemOfSubAsset = createAction(
    '[PartMasterItem] update item of sub asset',
    props<{ data: any }>()
  );

  static itemOfSubAssetUpdatedSuccessfully = createAction(
    '[PartMasterItem] item of sub asset updated successfully',
    props<{ data: any }>()
  );


  /*  ADD CATEGORY OF ASSET AND SUB ASSET */
  static addCategory = createAction(
    '[PartMasterItem] add category',
    props<{ data: any }>()
  );

  static categoryAddedSuccessfully = createAction(
    '[PartMasterItem] category added successfully',
    props<{ data: any }>()
  );



  static errorCategory = createAction(
    '[PartMasterCategory] error occurred',
    props<{ reason: any }>()
  );

  static resetCatgeory = createAction(
    '[PartMasterCategory] reset parameters'
  );

  static errorItem = createAction(
    '[PartMasterItem] error occurred',
    props<{ reason: any }>()
  );

  static resetItem = createAction(
    '[PartMasterItem] reset parameters'
  );

}
