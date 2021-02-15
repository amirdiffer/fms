import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-add-part-master',
  templateUrl: './add-part-master.component.html',
  styleUrls: ['./add-part-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPartMasterComponent implements OnInit {
  filterSetting = [
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

  constructor() {}

  ngOnInit(): void {}
}