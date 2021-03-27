import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-asset-detail',
  templateUrl: './asset-car-detail.component.html',
  styleUrls: ['./asset-car-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetCarDetailComponent implements OnInit {
  assetDetail = {
    VIN: 'fjhkhfhfhiuwr',
    licensePlate: 123456,
    status: 'Infleet Active',
    department: 'Dep Name-Area-Dubai',
    operator: 'User Name',
    assetType: 'Text text',
    make: 'Text text',
    model: 'Text text',
    year: 'Text text',
    trim: 'Text text',
    color: 'Text text',
    salik: 'Assign',
    warranty: 'Under Warranty'
  };
  constructor() {}

  ngOnInit(): void {}
}
