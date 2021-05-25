import { Component, OnInit } from '@angular/core';
import { AssetMasterService } from '@feature/fleet/+state/assets/asset-master';
import { ICardDetailRedialChart } from './detail-card-dashboard/detail-card-dashboard.component';
import { IAssetOverview } from '@models/asset-master.model';
import { AccessoryService } from '@feature/fleet/+state/accessory';
import { SubAssetService } from '@feature/fleet/+state/sub-asset';

@Component({
  selector: 'dashboard-asset-overview',
  templateUrl: './asset-overview.component.html',
  styleUrls: ['./asset-overview.component.scss']
})
export class AssetOverviewComponent implements OnInit {
  bussinessCategoryChartData: ICardDetailRedialChart[] = [];
  AssetDepartmentChartData: ICardDetailRedialChart[] = [];

  overviewData: IAssetOverview = {
    numOfActiveAssets: 0,
    numOfInactiveAssets: 0,
    numOfXFleetAssets: 0,
    numOfRegisteredAssets: 0,
    numOfCustomizedAssets: 0
  };
  accessoryOverviewData = [];
  subassetOverviewData = [];

  constructor(
    private _assetOverview: AssetMasterService,
    private _accessoryOverview: AccessoryService,
    private _subassetOverview: SubAssetService
  ) {}

  ngOnInit(): void {
    this._assetOverview.overviewAsset().subscribe((x) => {
      this.overviewData = x.message;
      this.bussinessCategoryChartData = this.overviewData.numOfAssetsByBusinessCategory.map(
        (d, i) => {
          let color = i == 0 ? '#39DA8A' : i == 1 ? '#6F7BF0' : '#FF5B5C';
          return {
            title: d.businessCategoryName,
            percent: (d.numOfAssets * 100) / 100,
            color: color
          };
        }
      );
      this.AssetDepartmentChartData = this.overviewData.numOfAssetsByOrganization.map(
        (d, i) => {
          let color = i == 0 ? '#39DA8A' : i == 1 ? '#6F7BF0' : '#FF5B5C';
          return {
            title: d.organizationName,
            percent: (d.numOfAssets * 100) / 100,
            color: color
          };
        }
      );
    });
    this._accessoryOverview.accessoryOverview().subscribe((x) => {
      let data = x.message;
      this.accessoryOverviewData = [
        data.numOfAssignedAccessories,
        data.numOfInactiveAccessories
      ];
    });
    this._subassetOverview.subAssetOverview().subscribe((x) => {
      let data = x.message;
      this.subassetOverviewData = [
        data.numOfActiveSubAssets,
        data.numOfInactiveSubAssets,
        data.numOfXFleetSubAssets
      ];
    });
  }
}
