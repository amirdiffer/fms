import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TechnicalInspectionActions } from './technical-inspections.actions';
import { TechnicalInspectionService } from './technical-inspections.service';

@Injectable()
export class TechnicalInspectionEffect {
  constructor(
    private action$: Actions,
    private service: TechnicalInspectionService
  ) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(TechnicalInspectionActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            return TechnicalInspectionActions.allDataLoaded({ data });
          }),
          catchError((error) =>
            of(TechnicalInspectionActions.error({ reason: error }))
          )
        )
      )
    )
  );
}
