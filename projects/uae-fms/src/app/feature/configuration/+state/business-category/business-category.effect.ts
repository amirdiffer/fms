import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { BusinessCategoryActions } from './business-category.actions';
import { BusinessCategoryService } from './business-category.service';

@Injectable()
export class BusinessCategoryEffect {
  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(BusinessCategoryActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => BusinessCategoryActions.allDataLoaded({ data })),
          catchError((error) =>
            of(BusinessCategoryActions.error({ reason: error }))
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private service: BusinessCategoryService
  ) {}
}
