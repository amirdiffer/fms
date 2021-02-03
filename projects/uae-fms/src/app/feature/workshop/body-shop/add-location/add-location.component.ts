import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableSetting } from '@core/table';

@Component({
  selector: 'anms-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddLocationComponent implements OnInit {
  addLocation_Table: TableSetting = {
    columns: [
      { lable: 'Location ID', type: 1, field: 'Location_ID' },
      { lable: 'Services', type: 1, field: 'Services' },
      { lable: 'Location', type: 1, field: 'Location' },
      { lable: 'Section', type: 1, field: 'Section' },
      { lable: 'Job Card', type: 1, field: 'Job_Card', sortable: true },
      { lable: 'Technician', type: 1, field: 'Technician', sortable: true },
      { lable: 'Assets', type: 1, field: 'Assets', sortable: true },
      {
        lable:
          '<img src="../../../../../assets/icons/ellipsis-v.svg" class="icon24px">',
        type: 3,
        width: 70,
        isIconLable: true,
        field: 'addButton',
        renderer: 'addButtonRenderer'
      }
    ],
    data: [
      {
        Location_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        Location: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      },
      {
        Location_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        Location: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      },
      {
        Location_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        Location: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      },
      {
        Location_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        Location: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      },
      {
        Location_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        Location: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      },
      {
        Location_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        Location: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      }
    ]
  };

  constructor() {}

  ngOnInit(): void {}
}
