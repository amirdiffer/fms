import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SubAssetPolicyActions } from './sub-asset-policy.actions';
import { SubAssetPolicyService } from './sub-asset-policy.service';

@Injectable()
export class SubAssetPolicyEffect {
  loadAllSubAssets$ = createEffect(() =>
    this.action$.pipe(
      ofType(SubAssetPolicyActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => SubAssetPolicyActions.allDataLoaded({ data })),
          catchError((error) =>
            of(SubAssetPolicyActions.error({ reason: error }))
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private service: SubAssetPolicyService
  ) {}
}
