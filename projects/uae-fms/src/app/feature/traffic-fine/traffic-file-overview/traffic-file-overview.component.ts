import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrafficFineTableService } from '@feature/traffic-fine/+state/traffic-fine';
import { SettingsFacade } from '@core/settings/settings.facade';
import { of } from 'rxjs';
import { TableSetting } from '@core/table';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'anms-traffic-file-overview',
  templateUrl: './traffic-file-overview.component.html',
  styleUrls: ['./traffic-file-overview.component.scss']
})
export class TrafficFileOverviewComponent implements OnInit {
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
  trafficFines: any[] = [];
  trafficOverviewTable : TableSetting = {
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
    private networkService: TrafficFineTableService,
    private settingsFacade: SettingsFacade,
    private locationStrategy: LocationStrategy
  ) {
    settingsFacade.language.subscribe((lang) => {
      this.isLtr = lang === 'en';
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.fileNumber = params.id;
      this.getFinesForId(params.id);
    });
  }
  goBack(): void {
    this.locationStrategy.back();
  }

  paginationEvent(action) {
    switch (action) {
      case 'next': {
        this.activePage += 1;
        this.networkService.getFinesOfSpecificFileNumber(this.fileNumber, this.activePage).subscribe((response) => {
          this.trafficFines = response.message;
        });
        break;
      }
      case 'previous': {
        this.activePage -= 1;
        this.networkService.getFinesOfSpecificFileNumber(this.fileNumber, this.activePage).subscribe((response) => {
          this.trafficFines = response.message;
        });
        break;
      }
      case 'rowCount': {
        this.networkService.getFinesOfSpecificFileNumber(this.fileNumber, this.activePage, this.ipp).subscribe((response) => {
          this.trafficFines = response.message;
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

  private getFinesForId(id: number): void {
    this.networkService
      .getFinesOfSpecificFileNumber(id)
      .subscribe((response) => {
        this.trafficFines = response.message;
        this.activePage = 0;
        this.count = response.resultNumber;
      });
  }

  public getTableData (index){
    if(this.trafficFines.length > 0){
      let description = this.trafficFines[index]
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
