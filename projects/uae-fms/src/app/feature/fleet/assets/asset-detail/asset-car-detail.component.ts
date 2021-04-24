import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'anms-asset-detail',
  templateUrl: './asset-car-detail.component.html',
  styleUrls: ['./asset-car-detail.component.scss']
})
export class AssetCarDetailComponent implements OnInit, OnChanges {
  @Input() asset;
  constructor() {}

  ngOnInit(): void {
    console.log(this.asset);
  }
  ngOnChanges() {}
}
