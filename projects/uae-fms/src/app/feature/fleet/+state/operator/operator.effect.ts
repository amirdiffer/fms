import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { OperatorActions } from './operator.actions';
import { OperatorService } from './operator.service';

@Injectable()
export class OperatorEffect {
  LoadAllOperator$ = createEffect(() =>
    this.action$.pipe(
      ofType(OperatorActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => OperatorActions.allDataLoaded({ data })),
          catchError((error) =>
            of(OperatorActions.error({ reason: error }))
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private service: OperatorService
  ) {}
}
