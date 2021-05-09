import { PartListActions } from './part-list.actions';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PartListSelectors } from './part-list.selectors';
import { PartListPartialState } from './part-list.entity';

@Injectable()
export class PartListFacade {

  assetPartList$ = this.store.pipe(select(PartListSelectors.selectAllAssetPartList));

  subAssetPartList$ = this.store.pipe(select(PartListSelectors.selectAllSubAssetPartList));

  specificAssetPart$ = this.store.pipe(select(PartListSelectors.specificAssetPart));

  specificSubAssetPart$ = this.store.pipe(select(PartListSelectors.specificSubAssetPart));

  updatedAssetPart$ = this.store.pipe(select(PartListSelectors.updatedAssetPart));

  updatedSubAssetPart$ = this.store.pipe(select(PartListSelectors.updatedSubAssetPart));

  messageAssetPart$ = this.store.pipe(select(PartListSelectors.messageAssetPart));

  messageSubAssetPart$ = this.store.pipe(select(PartListSelectors.messageSubAssetPart));

  errorAssetPart$ = this.store.pipe(select(PartListSelectors.errorAssetPart));

  errorSubAssetPart$ = this.store.pipe(select(PartListSelectors.errorSubAssetPart));

  constructor(private store: Store<PartListPartialState>) {}


  /* Load All Part */
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
