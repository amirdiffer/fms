import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { OrganizationService } from './organization.service';
import { OrganizationActions } from './organization.actions';

@Injectable()
export class OrganizationEffects {
  constructor(private action$: Actions, private service: OrganizationService) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(OrganizationActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            return OrganizationActions.allDataLoaded({ data });
          }),
          catchError((error) =>
            of(OrganizationActions.error({ reason: error }))
          )
        )
      )
    )
  );
}
