import { Component, OnInit } from '@angular/core';
import { AssetTrafficFineService } from '@feature/traffic-fine/+state/asset-traffic-fine';
import { ActivatedRoute } from '@angular/router';
import { SettingsFacade } from '@core/settings/settings.facade';
import { Observable, of } from 'rxjs';
import { AssetMasterFacade } from '@feature/fleet/+state/assets/asset-master';
import { map } from 'rxjs/operators';
import { TableSetting } from '@core/table';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'anms-asset-overview',
  templateUrl: './asset-overview.component.html',
  styleUrls: ['./asset-overview.component.scss']
})
export class AssetOverviewComponent implements OnInit {
  isLtr = true;
  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  arrowIcon = 'assets/icons/arrow-down.svg';
  ipp = 10;
  activePage: number;
  pagesCount: number;
  count: number;
  fileNumber: any;
  response: any;
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
    private _assetMasterFacade :AssetMasterFacade,
    private locationStrategy: LocationStrategy
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
      this.fileNumber = params.id;
      this.getAssetFinesForId(params.id);
      this._assetMasterFacade.getAssetByID(params.id)
    });
  }

  goBack(): void {
    this.locationStrategy.back();
  }

  handleDate(date: string): string {
    if (date) {
      const newDate = new Date(date);
      return newDate.toLocaleDateString();
    } else {
      return '';
    }
  }

  formatDate(date: string): string {
    const day = date?.substr(0, 2);
    const month = date?.substr(3, 2);
    const year = date?.substr(6, 4);
    return `${month}/${day}/${year}`;
  }

  paginationEvent(action) {
    switch (action) {
      case 'next': {
        this.activePage += 1;
        this.networkService.getFinesOfSpecificAsset(this.fileNumber, this.activePage).subscribe((response) => {
          this.assetFines = response.message;
        });
        break;
      }
      case 'previous': {
        this.activePage -= 1;
        this.networkService.getFinesOfSpecificAsset(this.fileNumber, this.activePage).subscribe((response) => {
          this.assetFines = response.message;
        });
        break;
      }
      case 'rowCount': {
        this.networkService.getFinesOfSpecificAsset(this.fileNumber, this.activePage, this.ipp).subscribe((response) => {
          this.assetFines = response.message;
        });
        break;
      }
    }
  }


  trackingShowRow(): string {
    this.pagesCount =
      this.count > this.ipp ? Math.ceil(this.count / this.ipp) - 1 : 0;
    const leftOver = this.count % this.ipp;
    const start = this.activePage * this.ipp;
    let end = start + this.ipp;
    leftOver > 0 && this.pagesCount === this.activePage
      ? (end = end - this.ipp + leftOver)
      : null;

    if (!isNaN(start) && !isNaN(end)) {
      return `${start}-${end}`;
    }
    return '';
  }

  private getAssetFinesForId(id: number): void {
    this.networkService.getFinesOfSpecificAsset(id).subscribe((response) => {
      console.log(response)
      this.assetFines = response.message;
      this.activePage = 0;
      this.count = response.resultNumber;
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
