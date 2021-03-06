import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { OrganizationService } from './organization.service';
import { OrganizationActions } from './organization.actions';
import { SubAssetService } from '@feature/fleet/+state/sub-asset';
import { TableFacade } from '@core/table/+state/table.facade';
import { Store } from '@ngrx/store';

@Injectable()
export class OrganizationEffects {
  constructor(private action$: Actions, private service: OrganizationService, private _tableFacade: TableFacade, private store: Store) { }

  loadAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(OrganizationActions.loadAll),
      mergeMap((action) =>
        this.service.loadAll().pipe(
          map((data) => {
            this._tableFacade.initialPaginator(data.resultNumber, 'organization');
            this.store.dispatch(OrganizationActions.count({ data: data.resultNumber }));
            return OrganizationActions.allDataLoaded({ data: data.message });
          }),
          catchError((error) =>
            of(OrganizationActions.error({ reason: error }))
          )
        )
      )
    )
  );

  addOrganization$ = createEffect(() =>
    this.action$.pipe(
      ofType(OrganizationActions.addOrganization),
      mergeMap((action) =>
        this.service.post(action.data).pipe(
          map((data) =>
            OrganizationActions.organizationAddedSuccessfully({ data: data.message })
          ),
          catchError((error) =>
            of(OrganizationActions.error({ reason: error }))
          )
        )
      )
    )
  );

  editOrganization$ = createEffect(() =>
    this.action$.pipe(
      ofType(OrganizationActions.editOrganization),
      mergeMap((action) =>
        this.service.edit(action.data).pipe(
          map((data) =>
            OrganizationActions.organizationEditedSuccessfully({ data: data.message })
          ),
          catchError((error) =>
            of(OrganizationActions.error({ reason: error }))
          )
        )
      )
    )
  );
}
