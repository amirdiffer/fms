import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-part-master',
  templateUrl: './part-master.component.html',
  styleUrls: ['./part-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartMasterComponent implements OnInit {
  filterSetting = [];
  constructor() { }

  ngOnInit(): void {
    this.filterSetting = [
      {
        filterTitle: 'Total',
        filterCount: '13',
        filterTagColor: '#6EBFB5'
      },
      {
        filterTitle: 'Available',
        filterCount: '08',
        filterTagColor: '#848CCF'
      },
      {
        filterTitle: 'Unavailable',
        filterCount: '02',
        filterTagColor: '#BA7967'
      }
    ];
  }
}

