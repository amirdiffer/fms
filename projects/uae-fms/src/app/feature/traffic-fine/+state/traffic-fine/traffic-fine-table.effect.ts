import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TrafficFineTableActions } from './traffic-fine-table.actions';
import { TrafficFineTableService } from './traffic-fine-table.service';

@Injectable()
export class TrafficFineTableEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(TrafficFineTableActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) =>
            TrafficFineTableActions.allDataLoaded({ data: data.message })
          ),
          catchError((error) =>
            of(TrafficFineTableActions.error({ reason: error }))
          )
        )
      )
    )
  );

  loadStatistics$ = createEffect(() =>
    this.action$.pipe(
      ofType(TrafficFineTableActions.loadStatistics),
      mergeMap((action) =>
        this.service.loadStatistics().pipe(
          map((data) => TrafficFineTableActions.statisticsLoaded({ data })),
          catchError((error) =>
            of(TrafficFineTableActions.error({ reason: error }))
          )
        )
      )
    )
  );

  getVehicleInfoByPlateNumber$ = createEffect(() =>
    this.action$.pipe(
      ofType(TrafficFineTableActions.getVehicleInformationByPlateNumber),
      mergeMap((action) =>
        this.service.getVehicleInformationByPlateNumber(action.data).pipe(
          map((data) =>
            TrafficFineTableActions.vehicleInformationByPlateNumberLoadedSuccessfully(
              { data: data.message }
            )
          ),
          catchError((error) =>
            of(TrafficFineTableActions.error({ reason: error }))
          )
        )
      )
    )
  );

  getVehicleInfoByChasisNumber$ = createEffect(() =>
    this.action$.pipe(
      ofType(TrafficFineTableActions.getVehicleInformationByChassisNumber),
      mergeMap((action) =>
        this.service.getVehicleInformationByChassisNumber(action.data).pipe(
          map((data) =>
            TrafficFineTableActions.vehicleInformationByChassisNumberLoadedSuccessfully(
              { data: data.message }
            )
          ),
          catchError((error) =>
            of(TrafficFineTableActions.error({ reason: error }))
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private service: TrafficFineTableService
  ) {}
}
