import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AssetConfigurationActions } from './asset-configuration.actions';
import { AssetConfigurationService } from './asset-configuration.service';

@Injectable()
export class AssetConfigurationEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssetConfigurationActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => AssetConfigurationActions.allDataLoaded({ data })),
          catchError((error) =>
            of(AssetConfigurationActions.error({ reason: error }))
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private service: AssetConfigurationService
  ) {}
}
