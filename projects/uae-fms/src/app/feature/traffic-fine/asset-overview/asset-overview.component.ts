import { Component, OnInit } from '@angular/core';
import { AssetTrafficFineService } from '@feature/traffic-fine/+state/asset-traffic-fine';
import { ActivatedRoute } from '@angular/router';
import { SettingsFacade } from '@core/settings/settings.facade';

@Component({
  selector: 'anms-asset-overview',
  templateUrl: './asset-overview.component.html',
  styleUrls: ['./asset-overview.component.scss']
})
export class AssetOverviewComponent implements OnInit {

  isLtr = true;

  assetFines: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private networkService: AssetTrafficFineService,
    private settingsFacade: SettingsFacade) {
    settingsFacade.language.subscribe((lang) => {
      this.isLtr = lang === 'en';
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getAssetFinesForId(params.id);
    });
  }

  private getAssetFinesForId(id: number): void {
    this.networkService.getFinesOfSpecificAsset(id).subscribe((response) => {
      this.assetFines = response.message;
    });
  }
}
