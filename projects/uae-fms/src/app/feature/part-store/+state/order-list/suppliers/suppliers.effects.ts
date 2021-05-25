import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { SuppliersService } from '@feature/part-store/+state/order-list/suppliers/suppliers.service';
import { SuppliersActions } from '@feature/part-store/+state/order-list/suppliers/suppliers.actions';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class SuppliersEffects {
  constructor(private action$: Actions, private service: SuppliersService ,  private _tableFacade: TableFacade) {}

  /* '''''Load''''' Supplier */
  loadSupplier$ = createEffect(() =>
   this.action$.pipe(
     ofType(SuppliersActions.loadAll),
     mergeMap((action) =>
       this.service.loadAllSupplier().pipe(
         map((data) => {
          this._tableFacade.initialPaginator(data.resultNumber, 'supplier-list');
           return SuppliersActions.allSupplierLoaded({ data: data.message });
         }),
         catchError((error) => of(SuppliersActions.error({ reason: error })))
        )
      )
    )
  );


 /* ''''''Add'''''' Supplier */
 addSupplier$ = createEffect(() =>
    this.action$.pipe(
      ofType(SuppliersActions.addSupplier),
      mergeMap((action) =>
        this.service.addSupplier(action.data).pipe(
          map((data) =>
            SuppliersActions.supplierAddedSuccessfully({
              data: { ...action.data, ...data.message }
            })
          ),
          catchError((error) => of(SuppliersActions.error({ reason: error })))
        )
      )
    )
  );


   /* '''''Get''''' Specific Supplier */
  getSpecificSupplier$ = createEffect(() =>
    this.action$.pipe(
      ofType(SuppliersActions.getSpecificSupplier),
      mergeMap((action) =>
        this.service.getSpecificSupplier(action.id).pipe(
          map((data) => {
            return SuppliersActions.specificSupplierLoaded({ data: data.message });
          }),
          catchError((error) => of(SuppliersActions.error({ reason: error })))
        )
      )
    )
  );


  /* '''''Update''''' Supplier*/
  updateSupplier$ = createEffect(() =>
    this.action$.pipe(
      ofType(SuppliersActions.updateSupplier),
      mergeMap((action) =>
        this.service.updateSupplier(action.data).pipe(
          map((data) =>
            SuppliersActions.supplierUpdatedSuccessfully({ data: action.data })
          ),
          catchError((error) => of(SuppliersActions.error({ reason: error })))
        )
      )
    )
  );
}
