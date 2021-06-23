import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrafficFineTableService } from '@feature/traffic-fine/+state/traffic-fine';
import { SettingsFacade } from '@core/settings/settings.facade';
import { off } from 'process';
import { of } from 'rxjs';
import { TableSetting } from '@core/table';

@Component({
  selector: 'anms-traffic-file-overview',
  templateUrl: './traffic-file-overview.component.html',
  styleUrls: ['./traffic-file-overview.component.scss']
})
export class TrafficFileOverviewComponent implements OnInit {
  isLtr = true;
  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
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
    private settingsFacade: SettingsFacade
  ) {
    settingsFacade.language.subscribe((lang) => {
      this.isLtr = lang === 'en';
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getFinesForId(params.id);
    });
  }

  private getFinesForId(id: number): void {
    this.networkService
      .getFinesOfSpecificFileNumber(id)
      .subscribe((response) => {
        console.log(response)
        this.trafficFines = response.message;
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
