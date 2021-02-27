import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AssetTypeFacade } from '../../+state/asset-configuration';

@Component({
  selector: 'configuration-asset-type',
  templateUrl: './asset-type.component.html',
  styleUrls: ['./asset-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetTypeComponent implements OnInit {
  constructor(private facade: AssetTypeFacade) {}

  ngOnInit(): void {
    this.facade.loadAll();
  }
}
