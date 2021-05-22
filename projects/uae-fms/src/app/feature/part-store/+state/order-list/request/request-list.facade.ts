import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RequestListSelectors } from '@feature/part-store/+state/order-list/request/request-list.selectors';
import { IRequestListPartialState } from '@feature/part-store/+state/order-list/request/request-list.entity';
import { RequestListActions } from '@feature/part-store/+state/order-list/request/request-list.actions';

@Injectable()
export class RequestListFacade {
  requestList$ = this.store.pipe(select(RequestListSelectors.selectAll));

  specificRequest$ = this.store.pipe(select(RequestListSelectors.specificRequest));

  statistics$ = this.store.pipe(select(RequestListSelectors.statistics));

  submitted$ = this.store.pipe(select(RequestListSelectors.submitted));

  approved$ = this.store.pipe(select(RequestListSelectors.approved));

  rejected$ = this.store.pipe(select(RequestListSelectors.rejected));

  message$ = this.store.pipe(select(RequestListSelectors.message));

  error$ = this.store.pipe(select(RequestListSelectors.error));

  constructor(private store: Store<IRequestListPartialState>) {}


  /* '''''Load''''' Requets For Asset and Sub Asset */
  loadRequestPartforAsset() {
    this.store.dispatch(RequestListActions.loadRequestPartforAsset());
  };
  loadRequestPartforSubAsset() {
    this.store.dispatch(RequestListActions.loadRequestPartforSubAsset());
  };


  /* '''''Load''''' statistics of request For Asset and Sub Asset */
  loadStatisticsOfRequestPartforAsset() {
    this.store.dispatch(RequestListActions.loadStatisticsOfRequestPartforAsset());
  };

  loadStatisticsOfRequestPartforSubAsset() {
    this.store.dispatch(RequestListActions.loadStatisticsOfRequestPartforSubAsset());
  };


  /* ''''''Add'''''' Requet For Asset and Sub Asset */
  addRequestPartAsset(data:any) {
    this.store.dispatch(RequestListActions.addRequestPartAsset({data}));
  };
  addRequestPartSubAsset(data:any) {
    this.store.dispatch(RequestListActions.addRequestPartSubAsset({data}));
  };


  /* '''''Get''''' Specific request for asset and sub asset */
  getSpecificRequestPartAsset(id:number){
    this.store.dispatch(RequestListActions.getSpecificRequestPartAsset({id}));
  };
  getSpecificRequestPartSubAsset(id:number){
    this.store.dispatch(RequestListActions.getSpecificRequestPartSubAsset({id}));
  };


  /* '''''Update''''' Request of Asset and Sub Asset*/
  updateRequestOfAsset(data:any){
    this.store.dispatch(RequestListActions.updateRequestOfAsset({data}))
  };
  updateRequestOfSubAsset(data:any){
    this.store.dispatch(RequestListActions.updateRequestOfSubAsset({data}))
  };


  /* '''''Approve''''' Request of Asset and Sub Asset*/
  approveSpecificRequestPartofAsset(id:number){
    this.store.dispatch(RequestListActions.approveSpecificRequestPartofAsset({id}));
  };
  approveSpecificRequestPartofSubAsset(id:number){
    this.store.dispatch(RequestListActions.approveSpecificRequestPartofSubAsset({id}));
  };


  /* '''''Reject''''' Request of Asset and Sub Asset*/
  rejectSpecificRequestPartofAsset(id:number){
    this.store.dispatch(RequestListActions.rejectSpecificRequestPartofAsset({id}));
  };
  rejectSpecificRequestPartofSubAsset(id:number){
    this.store.dispatch(RequestListActions.rejectSpecificRequestPartofSubAsset({id}));
  };

  /* '''''Reset''''' */
  reset(){
    this.store.dispatch(RequestListActions.reset());
  }

}
