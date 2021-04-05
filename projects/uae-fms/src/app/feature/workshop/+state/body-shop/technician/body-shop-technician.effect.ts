import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BodyShopTechnicianActions } from './body-shop-technician.actions';
import { BodyShopTechnicianService } from './body-shop-technician.service';

@Injectable()
export class BodyShopTechnicianEffect {
  constructor(
    private action$: Actions,
    private service: BodyShopTechnicianService
  ) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(BodyShopTechnicianActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            return BodyShopTechnicianActions.allDataLoaded({
              data: data.message
            });
          }),
          catchError((error) =>
            of(BodyShopTechnicianActions.error({ reason: error }))
          )
        )
      )
    )
  );
  editTechnician$ = createEffect(() =>
    this.action$.pipe(
      ofType(BodyShopTechnicianActions.editTechnician),
      mergeMap((action) =>
        this.service.editTechnician(action.technician).pipe(
          map((data) =>
            BodyShopTechnicianActions.technicianEditedSuccessfully({
              technician: action.technician
            })
          ),
          catchError((error) =>
            of(BodyShopTechnicianActions.error({ reason: error }))
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.action$.pipe(
      ofType(BodyShopTechnicianActions.addTechnician),
      mergeMap((action) =>
        this.service.post(action.data).pipe(
          map((data) =>
            BodyShopTechnicianActions.technicianAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) =>
            of(BodyShopTechnicianActions.error({ reason: error }))
          )
        )
      )
    )
  );
}
