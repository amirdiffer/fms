import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MovementOverviewActionsTemporary } from './movement-overview.actions';
import { MovementOverviewServiceTemporary } from './movement-overview.service';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class MovementOverviewEffectTemporary {
  LoadAllMovementOverviews$ = createEffect(() =>
    this.action$.pipe(
      ofType(MovementOverviewActionsTemporary.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            this._tableFacade.initialPaginator(data['resultNumber'], 'temporary_movement_overview');
            return MovementOverviewActionsTemporary.allDataLoaded({
              data: data['message']
            })
          }),
          catchError((error) =>
            of(MovementOverviewActionsTemporary.error({ reason: error }))
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private service: MovementOverviewServiceTemporary,
    private _tableFacade: TableFacade
  ) {}
}
