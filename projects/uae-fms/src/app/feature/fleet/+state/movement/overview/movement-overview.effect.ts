import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MovementOverviewActions } from './movement-overview.actions';
import { MovementOverviewService } from './movement-overview.service';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class MovementOverviewEffect {
  LoadAllMovementOverviews$ = createEffect(() =>
    this.action$.pipe(
      ofType(MovementOverviewActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            this._tableFacade.initialPaginator(data['resultNumber'], 'movement_overview');
            return MovementOverviewActions.allDataLoaded({ data:data['message'] });
          }),
          catchError((error) =>
            of(MovementOverviewActions.error({ reason: error }))
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private service: MovementOverviewService,
    private _tableFacade: TableFacade
  ) {}
}
