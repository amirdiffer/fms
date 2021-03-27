import { createAction, props } from '@ngrx/store';
import { IPendingCustomization } from '@models/pending-customization.model';

export class CustomizationActions {
  static loadAll = createAction('[Customization] load all data');

  static allDataLoaded = createAction(
    '[Customization] all datas are loaded',
    props<{ data: IPendingCustomization[] }>()
  );

  static error = createAction(
    '[Customization] error occurred',
    props<{ reason: any }>()
  );
}
