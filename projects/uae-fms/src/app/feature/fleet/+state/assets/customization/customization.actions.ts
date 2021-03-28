import { createAction, props } from '@ngrx/store';
import { ICustomizationModel } from '@feature/fleet/+state/assets/customization/customization.entity';

export class CustomizationActions {
  static loadAll = createAction('[Customization] load all data');

  static allDataLoaded = createAction(
    '[Customization] all datas are loaded',
    props<{ data: ICustomizationModel[] }>()
  );

  static error = createAction(
    '[Customization] error occurred',
    props<{ reason: any }>()
  );
}
