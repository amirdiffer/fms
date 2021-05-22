import { createAction, props } from '@ngrx/store';

export class RequestListActions {

  /* '''''Load''''' Requets For Asset and Sub Asset */
  static loadRequestPartforAsset = createAction(
    '[RequestList] load all asset request data'
  );

  static allRequestListForAssetLoaded = createAction(
    '[RequestList] all asset requests are loaded',
    props<{ data: any[] }>()
  );

  static loadRequestPartforSubAsset = createAction(
    '[RequestList] load all sub asset request part'
  );

  static allRequestListForSubAssetLoaded = createAction(
    '[RequestList] all sub asset requests part are loaded',
    props<{ data: any[] }>()
  );



  /* '''''Load''''' statistics of request For Asset and Sub Asset */
  static loadStatisticsOfRequestPartforAsset = createAction(
    '[RequestList] load all statistics of request for asset'
  );

  static allStatisticsOfRequestListForAssetLoaded = createAction(
    '[RequestList] all statistics of request for asset are loaded',
    props<{ data: any[] }>()
  );

  static loadStatisticsOfRequestPartforSubAsset = createAction(
    '[RequestList] load all statistics of request for sub asset'
  );

  static allStatisticsOfRequestListForSubAssetLoaded = createAction(
    '[RequestList] all statistics of request for sub asset are loaded',
    props<{ data: any[] }>()
  );

  
  
  /* ''''''Add'''''' Requet For Asset and Sub Asset */
  static addRequestPartAsset = createAction(
    '[RequestList] add request part of asset',
    props<{ data: any }>()
  );

  static requestOfAssetPartAddedSuccessfully = createAction(
    '[RequestList] request part for asset added successfully',
    props<{ data: any }>()
  );

  static addRequestPartSubAsset = createAction(
    '[RequestList] add request part of sub asset',
    props<{ data: any }>()
  );

  static requestOfSubAssetPartAddedSuccessfully = createAction(
    '[RequestList] request part for sub asset added successfully',
    props<{ data: any }>()
  );
  



  /* '''''Get''''' Specific request for asset and sub asset */
  static getSpecificRequestPartAsset = createAction(
    '[RequestList] load specific request part of asset',
    props<{ id: number }>()
  );

  static specificRequestPartOfAssetLoaded = createAction(
      '[RequestList] specific request part of asset are loaded',
      props<{ data: any[] }>()
  );

  static getSpecificRequestPartSubAsset = createAction(
    '[RequestList] load specific request part of sub asset',
    props<{ id: number }>()
  );

  static specificRequestPartOfSubAssetLoaded = createAction(
    '[RequestList] specific request part of sub asset are loaded',
    props<{ data: any[] }>()
  );



  /* '''''Update''''' Request of Asset and Sub Asset*/
  static updateRequestOfAsset = createAction(
    '[RequestList] update request part of asset',
    props<{ data: any }>()
  );

  static requestOfAssetUpdatedSuccessfully = createAction(
    '[RequestList] request part of asset updated successfully',
    props<{ data: any }>()
  );

  static updateRequestOfSubAsset = createAction(
    '[RequestList] update request part of sub asset',
    props<{ data: any }>()
  );

  static requestOfSubAssetUpdatedSuccessfully = createAction(
    '[RequestList] request part of sub asset updated successfully',
    props<{ data: any }>()
  );


  /* '''''Approve''''' Request of Asset and Sub Asset*/
  static approveSpecificRequestPartofAsset = createAction(
    '[RequestList] approve specific request part of asset',
    props<{ id: number }>()
  );

  static specificRequestPartOfAssetApprovedSuccessfully = createAction(
    '[RequestList] specific request part of asset are approved successfully',
    props<{ data: any[] }>()
  );

  static approveSpecificRequestPartofSubAsset = createAction(
    '[RequestList] approve specific request part of sub asset',
    props<{ id: number }>()
  );

  static specificRequestPartOfSubAssetApprovedSuccessfully = createAction(
    '[RequestList] specific request part of sub asset are approved successfully',
    props<{ data: any[] }>()
  );


  /* '''''Reject''''' Request of Asset and Sub Asset*/
  static rejectSpecificRequestPartofAsset = createAction(
    '[RequestList] reject specific request part of asset',
    props<{ id: number }>()
  );

  static specificRequestPartOfAssetRejectedSuccessfully = createAction(
    '[RequestList] specific request part of asset are rejected successfully',
    props<{ data: any[] }>()
  );

  static rejectSpecificRequestPartofSubAsset = createAction(
    '[RequestList] reject specific request part of sub asset',
    props<{ id: number }>()
  );

  static specificRequestPartOfSubAssetRejectedSuccessfully = createAction(
    '[RequestList] specific request part of sub asset are rejected successfully',
    props<{ data: any[] }>()
  );





  
  static error = createAction(
    '[RequestList] error occurred',
    props<{ reason: any }>()
  );

  static reset = createAction(
    '[RequestList] reset parameters'
  );
}
