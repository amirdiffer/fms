import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'part-store-asset-type',
  templateUrl: './asset-type.component.html',
  styleUrls: ['./asset-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetTypeComponent implements OnInit {
  defaultSelecAssetType = 'car';
  defaultSelectMake = 'bmw';
  defaultSelectModel = 'm6';
  constructor() {}

  ngOnInit(): void {}
}
