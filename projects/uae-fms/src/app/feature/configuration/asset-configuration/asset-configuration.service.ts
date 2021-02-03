import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IAssetConfiguration } from './asset-configuration.model';

@Injectable({
  providedIn: 'root'
})
export class AssetConfigurationService {
  private assetConfigurationData = (): IAssetConfiguration[] => {
    const data = [];
    for (let index = 0; index < 7; index++) {
      const el = {
        model: 'Cayenne GTS Coupe',
        make: 'Porsche',
        status: 'Active',
        description: 'Description Is Here Description',
        quant: 123
      };
      data.push(el);
    }
    return data;
  };

  public assetConfigurationableSetting = () => {
    return {
      columns: [
        {
          lable: 'Model',
          field: 'model',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'Make',
          field: 'make',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'Type Status',
          field: 'status',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: '',
          textColor: '#0DA06E'
        },
        {
          lable: 'Description',
          field: 'description',
          width: 200,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'Icon',
          field: 'quant',
          width: 50,
          type: 1,
          thumbField: '',
          renderer: ''
        }
      ],
      data: this.assetConfigurationData(),
      rowSettings: {
        onClick: (col, data) => {
          console.log(col, data);
        }
      }
    };
  };

  private _addtype$ = new Subject<boolean>();

  public loadAddForm(open: boolean) {
    this._addtype$.next(open);
  }
  public getAddForm(): Observable<boolean> {
    return this._addtype$.asObservable();
  }
  constructor() {}
}
