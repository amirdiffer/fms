import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TrafficFineTableSelectors } from './traffic-fine-table.selectors';
import { IGetVehicleInfoByChassisNumber, IGetVehicleInfoByPlateNumber, TrafficFineTablePartialState } from './traffic-fine-table.entity';
import { TrafficFineTableActions } from './traffic-fine-table.actions';

@Injectable()
export class TrafficFineTableFacade {
  trafficFine$ = this.store.pipe(select(TrafficFineTableSelectors.selectAll));

  statistics$ = this.store.pipe(
    select(TrafficFineTableSelectors.selectStatistics)
  );

  message$ = this.store.pipe(select(TrafficFineTableSelectors.message));

  error$ = this.store.pipe(select(TrafficFineTableSelectors.error));


  loaded$ = this.store.pipe(select(TrafficFineTableSelectors.loaded));

  vehicleInfo$  = this.store.pipe(select(TrafficFineTableSelectors.vehicleInfo));


  constructor(private store: Store<TrafficFineTablePartialState>) {}

  loadAll() {
    this.store.dispatch(TrafficFineTableActions.loadAll());
  }

  loadStatistics() {
    this.store.dispatch(TrafficFineTableActions.loadStatistics());
  }

  getVehicleInformationByPlateNumber(data:IGetVehicleInfoByPlateNumber){
    this.store.dispatch(TrafficFineTableActions.getVehicleInformationByPlateNumber({data}));
  }

  getVehicleInformationByChassisNumber(data:IGetVehicleInfoByChassisNumber){
    this.store.dispatch(TrafficFineTableActions.getVehicleInformationByChassisNumber({data}));
  }

  /* '''''Reset''''' */
  reset(){
    this.store.dispatch(TrafficFineTableActions.reset());
  }
}
