import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetMasterService } from '@feature/fleet/+state/assets/asset-master';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: 'overview-asset.component.html',
  styleUrls: ['./overview-asset.component.scss']
})
export class OverViewAssetComponent implements OnInit, OnDestroy {
  activeFilterDate = 'week';

  onDestroy = new Subject();
  //#region Filters
  filterSetting_BusinessCategory = [
    {
      filterTitle: 'statistic.calendar',
      isCalendar: true,
      filterCount: '13',
      filterTagColor: '#028D5D'
    },
    {
      filterTitle: 'statistic.total',
      filterSupTitle: 'statistic.item',
      filterCount: '13',
      filterTagColor: '#028D5D'
    },
    {
      filterTitle: 'statistic.asset',
      filterSupTitle: 'statistic.item',
      filterCount: '08',
      filterTagColor: '#009EFF'
    },
    {
      filterTitle: 'statistic.sub_asset',
      filterSupTitle: 'statistic.item',
      filterCount: '02',
      filterTagColor: '#FCB614'
    },
    {
      filterTitle: 'statistic.accessory',
      filterSupTitle: 'statistic.item',
      filterCount: '09',
      filterTagColor: '#F75A4A'
    }
  ];

  filterSetting_Request = [
    {
      filterTitle: 'statistic.calendar',
      isCalendar: true,
      filterCount: '13',
      filterTagColor: '#028D5D'
    },
    {
      filterTitle: 'statistic.technical_report',
      filterSupTitle: 'statistic.issue_type',
      filterCount: '13',
      filterTagColor: '#028D5D'
    },
    {
      filterTitle: 'statistic.repair',
      filterSupTitle: 'statistic.issue_type',
      filterCount: '08',
      filterTagColor: '#009EFF'
    },
    {
      filterTitle: 'statistic.estimate',
      filterSupTitle: 'statistic.issue_type',
      filterCount: '02',
      filterTagColor: '#FCB614'
    },
    {
      filterTitle: 'statistic.installation',
      filterSupTitle: 'statistic.issue_type',
      filterCount: '09',
      filterTagColor: '#F75A4A'
    }
  ];

  filterSetting_Job_Card = [
    {
      filterTitle: 'statistic.calendar',
      isCalendar: true,
      filterCount: '13',
      filterTagColor: '#028D5D'
    },
    {
      filterTitle: 'statistic.total',
      filterSupTitle: 'statistic.tasks',
      filterCount: '13',
      filterTagColor: '#028D5D'
    },
    {
      filterTitle: 'statistic.not_started',
      filterSupTitle: 'statistic.tasks',
      filterCount: '08',
      filterTagColor: '#009EFF'
    },
    {
      filterTitle: 'statistic.started',
      filterSupTitle: 'statistic.tasks',
      filterCount: '02',
      filterTagColor: '#FCB614'
    },
    {
      filterTitle: 'statistic.closed',
      filterSupTitle: 'statistic.tasks',
      filterCount: '09',
      filterTagColor: '#F75A4A'
    }
  ];
  //#endregion

  assetID = this.activeRoute.snapshot.params['id'];
  bcID;
  warrantyData = [];
  activeButton = 1;
  fileServerBaseUrl = environment.baseFileServer;
  id;
  assetDetail$: Subscription;
  assetDetail;
  constructor(
    private activeRoute: ActivatedRoute,
    private _service: AssetMasterService
  ) {}

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id'];
    this.assetDetail$ = this._service
      .getAssetByID(this.id)
      .pipe(map((x) => x.message))
      .subscribe((x) => {
        this.assetDetail = x;
        this.bcID = x['businessCategoryId'];
        this.warrantyData = x['warranties'];
      });
  }

  ngOnDestroy() {
    this.assetDetail$.unsubscribe();
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  activeTab = 'Overview';
  selectedTab(event: string) {
    this.activeTab = event;
  }
}
