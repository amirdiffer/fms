import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SubAssetPolicyActions } from './sub-asset-policy.actions';
import { SubAssetPolicyService } from './sub-asset-policy.service';
import { TableFacade } from '@core/table/+state/table.facade';
import { Store } from '@ngrx/store';

@Injectable()
export class SubAssetPolicyEffect {
  loadAllSubAssets$ = createEffect(() =>
    this.action$.pipe(
      ofType(SubAssetPolicyActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            this._tableFacade.initialPaginator(
              data.resultNumber,
              'asset-policy_subasset'
            );
            this._store.dispatch(
              SubAssetPolicyActions.count({ data: data.resultNumber })
            );
            return SubAssetPolicyActions.allDataLoaded({ data: data.message });
          }),
          catchError((error) =>
            of(SubAssetPolicyActions.error({ reason: error }))
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private service: SubAssetPolicyService,
    private _tableFacade: TableFacade,
    private _store: Store
  ) {}
}
