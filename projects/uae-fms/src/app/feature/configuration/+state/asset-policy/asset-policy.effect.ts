import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AssetPolicyActions } from './asset-policy.actions';
import { AssetPolicyService } from './asset-policy.service';

@Injectable()
export class AssetPolicyEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(AssetPolicyActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => AssetPolicyActions.allDataLoaded({ data })),
          catchError((error) => of(AssetPolicyActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(private action$: Actions, private service: AssetPolicyService) {}
}
