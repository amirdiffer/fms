import { Component, OnInit } from '@angular/core';
import { AssetTrafficFineService } from '@feature/traffic-fine/+state/asset-traffic-fine';
import { ActivatedRoute } from '@angular/router';
import { SettingsFacade } from '@core/settings/settings.facade';
import { Observable, of } from 'rxjs';
import { AssetMasterFacade } from '@feature/fleet/+state/assets/asset-master';
import { map } from 'rxjs/operators';
import { TableSetting } from '@core/table';

@Component({
  selector: 'anms-asset-overview',
  templateUrl: './asset-overview.component.html',
  styleUrls: ['./asset-overview.component.scss']
})
export class AssetOverviewComponent implements OnInit {
  isLtr = true;
  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  assetFines: any[] = [];
  assetDetail$ : Observable<any>;
  assetTrafficOverviewTable : TableSetting = {
    columns: [
      {
        lable: 'tables.column.description',
        type: 1,
        field: 'description',
        renderer: '',
      },
      {
        lable: 'tables.column.english',
        type: 1,
        field: 'english',
        renderer: '',
      },
      {
        lable: 'tables.column.arabic',
        type: 1,
        field: 'arabic',
        renderer: '',
      },
    ],
    data:[]
  }
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private networkService: AssetTrafficFineService,
    private settingsFacade: SettingsFacade,
    private _assetMasterFacade :AssetMasterFacade
  ) {
    settingsFacade.language.subscribe((lang) => {
      this.isLtr = lang === 'en';
    });
    this._assetMasterFacade.reset();
  }

  ngOnInit(): void {
    this.assetDetail$  = this._assetMasterFacade.specificAsset$.pipe(
      map(x => {
        return {message:{...x}}
      })
    )
    this._assetMasterFacade.specificAsset$.subscribe(x=>{console.log(x)})
    this.activatedRoute.params.subscribe((params) => {
      this.getAssetFinesForId(params.id);
      this._assetMasterFacade.getAssetByID(params.id)
    });
  }

  private getAssetFinesForId(id: number): void {
    this.networkService.getFinesOfSpecificAsset(id).subscribe((response) => {
      console.log(response)
      this.assetFines = response.message;
    });
  }

  public getTableData (index){
    if(this.assetFines.length > 0){
      let description = this.assetFines[index]
      return of([
        {
          description : description.plateCategoryCFICode,
          english:description.plateCategoryDescEn,
          arabic:description.plateCategoryDescAr,
        },
        {
          description : description.ticketStatus,
          english:description.ticketStatusDescE,
          arabic:description.ticketStatusDescA,
        },
        {
          description : description.ticketType,
          english:description.ticketViolationDesE,
          arabic:description.ticketViolationDesA,
        }
      ])
    }else{
      return of([])
    }
  }
}
