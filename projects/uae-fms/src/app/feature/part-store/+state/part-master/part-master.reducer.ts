import { Action, createReducer, on } from '@ngrx/store';
import { PartMasterActions } from './part-master.actions';
import {
  initialStateCategory,
  initialStateItem,
  partMasterCategoryAdapter,
  PartMasterCategoryState,
  partMasterItemAdapter,
  PartMasterItemState
} from './part-master.entity';


/*  CATEGORY  */
const partMasterCategoryReducer = createReducer(
  initialStateCategory,

   /* --------- Asset Category Part -------------- */
  on(PartMasterActions.getCategoryOfAsset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null,
    listCategoryOfAsset: null
  })),

  on(PartMasterActions.categoryOfAssetLoaded, (state, { data }) =>
    partMasterCategoryAdapter.setAll(data, { ...state, loaded: true, error: null , listCategoryOfAsset: data})
  ),

  on(PartMasterActions.getSpecificCategoryOfAsset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(PartMasterActions.specificCategoryOfAssetLoaded, (state, { data }) => ({
    ...state,
    loaded: true,
    error: null,
    specificCategory: data
  })),

  on(PartMasterActions.updateCategoryOfAsset, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),

  on(PartMasterActions.categoryOfAssetUpdatedSuccessfully, (state, { data }) =>
    partMasterCategoryAdapter.updateOne(
      { changes: data, id: data.id },
      {
        ...state,
        error: null,
        message: null,
        submitted: true
      }
    )
  ),
  



  /* --------- Sub Asset Category Part -------------- */
  on(PartMasterActions.getCategoryOfSubAsset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null,
    listCategoryOfSubAsset:null,
  })),

  on(PartMasterActions.categoryOfSubAssetLoaded, (state, { data }) =>
    partMasterCategoryAdapter.setAll(data, { ...state, loaded: true, error: null , listCategoryOfSubAsset: data })
  ),

  on(PartMasterActions.getSpecificCategoryOfSubAsset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(PartMasterActions.specificCategoryOfSubAssetLoaded, (state, { data }) => ({
    ...state,
    loaded: true,
    error: null,
    specificCategory: data
  })),

  on(PartMasterActions.updateCategoryOfSubAsset, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),

  on(PartMasterActions.categoryOfSubAssetUpdatedSuccessfully, (state, { data }) =>
    partMasterCategoryAdapter.updateOne(
      { changes: data, id: data.id },
      {
        ...state,
        error: null,
        message: null,
        submitted: true
      }
    )
  ),



  /* ADD CATEGORY OF ASSET AND SUB ASSTE */
  on(PartMasterActions.addCategory, (state, { data }) => ({
    ...state,
    submitted: false
  })),

  on(PartMasterActions.categoryAddedSuccessfully, (state, { data }) => ({
    ...state,
    submitted: true
  })),


  on(PartMasterActions.errorCategory, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),

  /* RESET */
  on(PartMasterActions.resetCatgeory, (state) => ({
    ...state,
    error: null,
    message: null,
    submitted: false,
    specificCategory:null,
    listCategoryOfSubAsset:null,
    listCategoryOfAsset:null
  }))

);



  /*  ITEM  */
const partMasterItemReducer = createReducer(
  initialStateItem,


  /* --------- Asset Part Item -------------- */

  on(PartMasterActions.getItemOfAsset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(PartMasterActions.itemOfAssetLoaded, (state, { data }) =>
    partMasterItemAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),

  on(PartMasterActions.getSpecificItemOfAsset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(PartMasterActions.specificItemOfAssetLoaded, (state, { data }) => ({
    ...state,
    loaded: true,
    error: null,
    specificItem: data
  })),

  on(PartMasterActions.addItemOfAsset, (state, { data }) => ({
    ...state,
    submitted: false
  })),

  on(PartMasterActions.itemOfAssetAddedSuccessfully, (state, { data }) => ({
    ...state,
    submitted: true
  })),

  on(PartMasterActions.updateItemOfAsset, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),

  on(PartMasterActions.itemOfAssetUpdatedSuccessfully, (state, { data }) =>
    partMasterItemAdapter.updateOne(
      { changes: data, id: data.id },
      {
        ...state,
        error: null,
        message: null,
        submitted: true
      }
    )
  ),






  /* --------- Sub Asset Part Item-------------- */

  on(PartMasterActions.getItemOfSubAsset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(PartMasterActions.itemOfSubAssetLoaded, (state, { data }) =>
    partMasterItemAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),

  on(PartMasterActions.getSpecificItemOfSubAsset, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(PartMasterActions.specificItemOfSubAssetLoaded, (state, { data }) => ({
    ...state,
    loaded: true,
    error: null,
    specificItem: data
  })),

  on(PartMasterActions.addItemOfSubAsset, (state, { data }) => ({
    ...state,
    submitted: false
  })),

  on(PartMasterActions.itemOfSubAssetAddedSuccessfully, (state, { data }) => ({
    ...state,
    submitted: true
  })),

  on(PartMasterActions.updateItemOfSubAsset, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),

  on(PartMasterActions.itemOfSubAssetUpdatedSuccessfully, (state, { data }) =>
    partMasterItemAdapter.updateOne(
      { changes: data, id: data.id },
      {
        ...state,
        error: null,
        message: null,
        submitted: true
      }
    )
  ),


  /* ERROR */
  on(PartMasterActions.errorItem, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),

  /* RESET */
  on(PartMasterActions.resetItem, (state) => ({
    ...state,
    error: null,
    message: null,
    submitted: false,
    specificItem:null
  })),

  


)
export function categoryReducer(state: PartMasterCategoryState, action: Action) {
  return partMasterCategoryReducer(state, action);
}
export function itemReducer(state: PartMasterItemState, action: Action) {
  return partMasterItemReducer(state, action);
}