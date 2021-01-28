import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'configuration-asset-type',
  templateUrl: './asset-type.component.html',
  styleUrls: ['./asset-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetTypeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
