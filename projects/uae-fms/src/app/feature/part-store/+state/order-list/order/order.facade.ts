import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OrderListSelectors } from '@feature/part-store/+state/order-list/order/order.selectors';
import { IRequestListPartialState } from '@feature/part-store/+state/order-list/request/request-list.entity';
import { OrderListActions } from '@feature/part-store/+state/order-list/order/order.actions';

@Injectable()
export class OrderListFacade {
  orderList$ = this.store.pipe(select(OrderListSelectors.selectAll));

  specificOrder$ = this.store.pipe(select(OrderListSelectors.specificOrder));

  statistics$ = this.store.pipe(select(OrderListSelectors.statistics));

  submitted$ = this.store.pipe(select(OrderListSelectors.submitted));


  message$ = this.store.pipe(select(OrderListSelectors.message));

  error$ = this.store.pipe(select(OrderListSelectors.error));

  constructor(private store: Store<IRequestListPartialState>) {}


  /* '''''Load''''' Order For Asset and Sub Asset */
  loadOrderPartforAsset() {
    this.store.dispatch(OrderListActions.loadOrderPartforAsset());
  };
  loadOrderPartforSubAsset() {
    this.store.dispatch(OrderListActions.loadOrderPartforSubAsset());
  };


  /* '''''Load''''' statistics of Order For Asset and Sub Asset */
  loadStatisticsOfOrderPartforAsset() {
    this.store.dispatch(OrderListActions.loadStatisticsOfOrderPartforAsset());
  };

  loadStatisticsOfOrderPartforSubAsset() {
    this.store.dispatch(OrderListActions.loadStatisticsOfOrderPartforSubAsset());
  };


  /* ''''''Add'''''' Order For Asset and Sub Asset */
  addOrderPartAsset(data:any) {
    this.store.dispatch(OrderListActions.addOrderPartAsset({data}));
  };
  addOrderPartSubAsset(data:any) {
    this.store.dispatch(OrderListActions.addOrderPartSubAsset({data}));
  };


  /* '''''Get''''' Specific Order for asset and sub asset */
  getSpecificOrderPartAsset(id:number){
    this.store.dispatch(OrderListActions.getSpecificOrderPartAsset({id}));
  };
  getSpecificOrderPartSubAsset(id:number){
    this.store.dispatch(OrderListActions.getSpecificOrderPartSubAsset({id}));
  };


  /* '''''Update''''' Request of Asset and Sub Asset*/
  updateOrderOfAsset(data:any){
    this.store.dispatch(OrderListActions.updateOrderOfAsset({data}))
  };
  updateOrderOfSubAsset(data:any){
    this.store.dispatch(OrderListActions.updateOrderOfSubAsset({data}))
  };


  /* '''''Receive''''' Order of Asset and Sub Asset*/
  receiveSpecificOrderPartofAsset(id:number){
    this.store.dispatch(OrderListActions.receiveSpecificOrderPartAsset({id}));
  };
  receiveSpecificOrderPartofSubAsset(id:number){
    this.store.dispatch(OrderListActions.receiveSpecificOrderPartSubAsset({id}));
  };


  /* '''''Reset''''' */
  reset(){
    this.store.dispatch(OrderListActions.reset());
  }

}
