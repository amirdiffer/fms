import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { IntegrationActions } from './integration.actions';
import { IntegrationService } from './integration.service';

@Injectable()
export class IntegrationEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(IntegrationActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => IntegrationActions.allDataLoaded({ data })),
          catchError((error) => of(IntegrationActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(private action$: Actions, private service: IntegrationService) {}
}
