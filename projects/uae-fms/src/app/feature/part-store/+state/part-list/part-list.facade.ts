import { PartListActions } from './part-list.actions';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PartListSelectors } from './part-list.selectors';
import { PartListPartialState } from './part-list.entity';

@Injectable()
export class PartListFacade {

  assetAccumulatedPartList$ = this.store.pipe(select(PartListSelectors.selectAllAccumulatedAssetPartList));

  subAssetAccumulatedPartList$ = this.store.pipe(select(PartListSelectors.selectAllAccumulatedSubAssetPartList));

  assetPartList$ = this.store.pipe(select(PartListSelectors.listPartForSpecificItemAsset));

  subAssetPartList$ = this.store.pipe(select(PartListSelectors.listPartForSpecificItemSubAsset));

  specificAssetPart$ = this.store.pipe(select(PartListSelectors.specificAssetPart));

  specificSubAssetPart$ = this.store.pipe(select(PartListSelectors.specificSubAssetPart));

  statisticsAssetPart$ = this.store.pipe(select(PartListSelectors.statisticsAssetPart));

  statisticsSubAssetPart$ = this.store.pipe(select(PartListSelectors.statisticsSubAssetPart));

  updatedAssetPart$ = this.store.pipe(select(PartListSelectors.updatedAssetPart));

  updatedSubAssetPart$ = this.store.pipe(select(PartListSelectors.updatedSubAssetPart));

  messageAssetPart$ = this.store.pipe(select(PartListSelectors.messageAssetPart));

  messageSubAssetPart$ = this.store.pipe(select(PartListSelectors.messageSubAssetPart));

  errorAssetPart$ = this.store.pipe(select(PartListSelectors.errorAssetPart));

  errorSubAssetPart$ = this.store.pipe(select(PartListSelectors.errorSubAssetPart));

  constructor(private store: Store<PartListPartialState>) {}


  /* Load All Part */

  loadAllAccumulatedAssetPartList(id:number) {
    this.store.dispatch(PartListActions.getAccumulatedPartListOfAsset({id}));
  };

  loadAllAccumulatedSubAssetPartList(id:number) {
    this.store.dispatch(PartListActions.getAccumulatedPartListOfSubAsset({id}));
  };


  loadAllAssetPartList(id:number) {
    this.store.dispatch(PartListActions.getPartListOfAsset({id}));
  };

  loadAllSubAssetPartList(id:number) {
    this.store.dispatch(PartListActions.getPartListOfSubAsset({id}));
  };

  /* Load Specific Part */
  loadSpecificPartOfAsset(id:number){
    this.store.dispatch(PartListActions.getSpecificPartOfAsset({id}));
  };

  loadSpecificPartOfSubAsset(id:number){
    this.store.dispatch(PartListActions.getSpecificPartOfSubAsset({id}));
  };

  loadStatisticsPartOfAsset(id:number){
    this.store.dispatch(PartListActions.getStatisticPartListOfAsset({id}));
  };

  loadStatisticsPartOfSubAsset(id:number){
    this.store.dispatch(PartListActions.getStatisticPartListOfSubAsset({id}));
  };

  updatePartOfAsset(data:any){
    this.store.dispatch(PartListActions.updatePartOfAsset({data}))
  };

  updatePartOfSubAsset(data:any){
    this.store.dispatch(PartListActions.updatePartOfSubAsset({data}))
  };

  resetPartAssetState() {
    this.store.dispatch(PartListActions.resetAssetPartState());
  };

  resetPartSubAssetState() {
    this.store.dispatch(PartListActions.resetSubAssetPartState());
  }

}
