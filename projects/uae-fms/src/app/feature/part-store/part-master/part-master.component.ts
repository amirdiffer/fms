import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PartMasterService } from './part-master.service';

@Component({
  selector: 'anms-part-master',
  templateUrl: './part-master.component.html',
  styleUrls: ['./part-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartMasterComponent implements OnInit {
  searchIcon = 'assets/icons/search-solid.svg';
  downloadBtn = 'assets/icons/download-solid.svg';
  filterSetting = [];
  partMasterTableSetting;
  constructor(private _partMasterService: PartMasterService) {}

  ngOnInit(): void {
    this.filterSetting = [
      {
        filterTitle: 'statistic.total',
        filterCount: '13',
        filterTagColor: '#6EBFB5'
      },
      {
        filterTitle: 'statistic.available',
        filterCount: '08',
        filterTagColor: '#848CCF'
      },
      {
        filterTitle: 'statistic.unavailable',
        filterCount: '02',
        filterTagColor: '#BA7967'
      }
    ];
    this.partMasterTableSetting = this._partMasterService.partMastertableSetting();
  }
}
