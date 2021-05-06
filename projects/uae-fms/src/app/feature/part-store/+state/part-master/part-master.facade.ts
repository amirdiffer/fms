import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PartMasterActions } from './part-master.actions';
import { PartMasterPartialState } from './part-master.entity';
import { PartMasterSelectors } from './part-master.selectors';

@Injectable()
export class PartMasterFacade {

  partMasterCategory$ = this.store.pipe(select(PartMasterSelectors.selectAllCategory));

  partMasterItem$ = this.store.pipe(select(PartMasterSelectors.selectAllItem));

  specificCategory$ = this.store.pipe(select(PartMasterSelectors.specificCategory));

  specificItem$ = this.store.pipe(select(PartMasterSelectors.specificItem));

  submittedCategory$ = this.store.pipe(select(PartMasterSelectors.submittedCategory));

  submittedItem$ = this.store.pipe(select(PartMasterSelectors.submittedItem));

  messageCategory$ = this.store.pipe(select(PartMasterSelectors.messageCategory));

  messageItem$ = this.store.pipe(select(PartMasterSelectors.messageItem));

  errorCategory$ = this.store.pipe(select(PartMasterSelectors.errorCatgeory));

  errorItem$ = this.store.pipe(select(PartMasterSelectors.errorItem));

  constructor(private store: Store<PartMasterPartialState>) {}

  /* CATEGORY */
  loadAllCategoryOfAsset(id:number) {
    this.store.dispatch(PartMasterActions.getCategoryOfAsset({id}));
  };

  loadAllCategoryOfSubAsset(id:number) {
    this.store.dispatch(PartMasterActions.getCategoryOfSubAsset({id}));
  };

  loadSpecificCategoryOfAsset(id:number){
    this.store.dispatch(PartMasterActions.getSpecificCategoryOfAsset({id}));
  };

  loadSpecificCategoryOfSubAsset(id:number){
    this.store.dispatch(PartMasterActions.getSpecificCategoryOfSubAsset({id}));
  };

  addCategory(data:any) {
    this.store.dispatch(PartMasterActions.addCategory({data}));
  };
  
  updateCategoryOfAsset(data:any){
    this.store.dispatch(PartMasterActions.updateCategoryOfAsset({data}))
  };

  updateCategoryOfSubAsset(data:any){
    this.store.dispatch(PartMasterActions.updateCategoryOfSubAsset({data}))
  };

  /* ITEM */
  loadAllItemOfAsset(id:number) {
    this.store.dispatch(PartMasterActions.getItemOfAsset({id}));
  };

  loadAllItemOfSubAsset(id:number) {
    this.store.dispatch(PartMasterActions.getItemOfSubAsset({id}));
  };
  
  loadSpecificItemOfSubAsset(id:number){
    this.store.dispatch(PartMasterActions.getSpecificItemOfSubAsset({id}));
  };

  loadSpecificItemOfAsset(id:number){
    this.store.dispatch(PartMasterActions.getSpecificItemOfAsset({id}));
  };

  addItemOfAsset(data:any) {
    this.store.dispatch(PartMasterActions.addItemOfAsset({data}));
  };

  addItemOfSubAsset(data:any) {
    this.store.dispatch(PartMasterActions.addItemOfSubAsset({data}));
  };

  updateItemOfAsset(data:any){
    this.store.dispatch(PartMasterActions.updateItemOfAsset({data}))
  };

  updateItemOfSubAsset(data:any){
    this.store.dispatch(PartMasterActions.updateItemOfSubAsset({data}))
  };

  resetCategory() {
    this.store.dispatch(PartMasterActions.resetCatgeory());
  }

  resetItem() {
    this.store.dispatch(PartMasterActions.resetItem());
  }

}
