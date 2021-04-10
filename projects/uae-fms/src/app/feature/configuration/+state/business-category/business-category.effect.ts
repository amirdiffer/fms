import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { BusinessCategoryActions } from './business-category.actions';
import { BusinessCategoryService } from './business-category.service';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class BusinessCategoryEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(BusinessCategoryActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            this._tableFacade.initialPaginator(data.resultNumber, 'business-category');
            return BusinessCategoryActions.allDataLoaded({ data: data.message })
          }),
          catchError((error) =>
            of(BusinessCategoryActions.error({ reason: error }))
          )
        )
      )
    )
  );

  editCategory$ = createEffect(() =>
    this.action$.pipe(
      ofType(BusinessCategoryActions.editCategory),
      mergeMap((action) =>
        this.service.editCategory(action.category,action.id).pipe(
          map((data) =>
            BusinessCategoryActions.categoryEditedSuccessfully({
              category: action.category
            })
          ),
          catchError((error) =>
            of(BusinessCategoryActions.error({ reason: error }))
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.action$.pipe(
      ofType(BusinessCategoryActions.addCategory),
      mergeMap((action) =>
        this.service.post(action.data).pipe(
          map((data) =>
            BusinessCategoryActions.categoryAddedSuccessfully({
              data: data.message
            })
          ),
          catchError((error) =>
            of(BusinessCategoryActions.error({ reason: error }))
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private service: BusinessCategoryService,
    private _tableFacade: TableFacade
  ) {}
}
