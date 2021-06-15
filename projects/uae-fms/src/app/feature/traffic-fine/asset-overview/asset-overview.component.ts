import { Component, OnInit } from '@angular/core';
import { AssetTrafficFineService } from '@feature/traffic-fine/+state/asset-traffic-fine';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'anms-asset-overview',
  templateUrl: './asset-overview.component.html',
  styleUrls: ['./asset-overview.component.scss']
})
export class AssetOverviewComponent implements OnInit {

  assetFines: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private networkService: AssetTrafficFineService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getAssetFinesForId(params.id);
    });
  }

  private getAssetFinesForId(id: number): void {
    this.networkService.getFinesOfSpecificAsset(id).subscribe((response) => {
      this.assetFines = response.message;
    })
  }
}
