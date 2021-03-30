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
          map((data) => OperatorActions.allDataLoaded({ data: data.message })),
          catchError((error) => of(OperatorActions.error({ reason: error })))
        )
      )
    )
  );
  editOperator$ = createEffect(() =>
    this.action$.pipe(
      ofType(OperatorActions.editOperator),
      mergeMap((action) =>
        this.service.editOperator(action.operator).pipe(
          map((data) =>
            OperatorActions.operatorEditedSuccessfully({
              operator: action.operator
            })
          ),
          catchError((error) => of(OperatorActions.error({ reason: error })))
        )
      )
    )
  );
  addData$ = createEffect(() =>
    this.action$.pipe(
      ofType(OperatorActions.addOperator),
      mergeMap((action) =>
        this.service.post(action.data).pipe(
          map((data) =>
            OperatorActions.operatorAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) => of(OperatorActions.error({ reason: error })))
        )
      )
    )
  );

  constructor(private action$: Actions, private service: OperatorService) {}
}
