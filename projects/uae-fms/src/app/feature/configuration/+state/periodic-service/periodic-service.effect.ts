import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PeriodicServiceActions } from './periodic-service.actions';
import { PeriodicServiceService } from './periodic-service.service';

@Injectable()
export class PeriodicServiceEffect {
  fakeData = [
    {id: 1, name: 'morteza'},
    {id: 2, name: 'ali'},
  ];
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(PeriodicServiceActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => PeriodicServiceActions.allDataLoaded({ data: this.fakeData })),
          catchError((error) =>
            of(PeriodicServiceActions.error({ reason: error }))
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private service: PeriodicServiceService
  ) {}
}
