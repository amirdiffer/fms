import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { CustomizationActions } from '@feature/fleet/+state/assets/customization/customization.actions';
import { CustomizationService } from '@feature/fleet/+state/assets/customization/customization.service';
import { TableFacade } from '@core/table/+state/table.facade';
import { Store } from '@ngrx/store';

@Injectable()
export class CustomizationEffects {
  constructor(
    private action$: Actions,
    private service: CustomizationService,
    private _tableFacade: TableFacade,
    private _store: Store
  ) {}

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(CustomizationActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            this._tableFacade.initialPaginator(
              data.resultNumber,
              'asset_customization'
            );
            this._store.dispatch(
              CustomizationActions.count({ data: data.resultNumber })
            );
            return CustomizationActions.allDataLoaded({ data: data.message });
          }),
          catchError((error) =>
            of(CustomizationActions.error({ reason: error }))
          )
        )
      )
    )
  );
}
