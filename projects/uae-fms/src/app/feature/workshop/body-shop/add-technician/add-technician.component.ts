import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ColumnType, TableSetting } from '@core/table';

@Component({
  selector: 'anms-add-technician',
  templateUrl: './add-technician.component.html',
  styleUrls: ['./add-technician.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTechnicianComponent implements OnInit {
  addTechnician_Table: TableSetting = {
    columns: [
      {
        lable: 'Technician',
        field: 'technician',
        renderer: 'userRenderer',
        thumbField: 'picture'
      },
      { lable: 'Skill', field: 'skill', type: ColumnType.lable },
      {
        lable: 'Status',
        field: 'status',
        type: ColumnType.lable,
        width: 120,
        textColor: '#6870B4'
      },
      { lable: 'Tasks', field: 'tasks', type: ColumnType.lable, width: 120 },
      {
        lable: 'Information',
        field: 'information',
        type: ColumnType.lable,
        width: 100,
        renderer: 'informationRenderer'
      },
      {
        lable: 'Rate Per Hour',
        field: 'ratePerHour',
        type: ColumnType.lable,
        width: 100
      }
    ],
    data: [
      {
        statusColor: '#6870B4',
        firstName: 'Sam',
        lastName: 'Smith',
        picture: 'user-image.png',
        id: '123456789',
        skill:
          'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
        status: 'Available',
        tasks: '2',
        information: {
          email: 'sample@gmail.com',
          phoneNumber: '+971505653793'
        },
        ratePerHour: '0000 AED'
      },
      {
        statusColor: '#6870B4',
        firstName: 'Sam',
        lastName: 'Smith',
        picture: 'user-image.png',
        id: '123456789',
        skill:
          'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
        status: 'Available',
        tasks: '2',
        information: {
          email: 'sample@gmail.com',
          phoneNumber: '+971505653793'
        },
        ratePerHour: '0000 AED'
      },
      {
        statusColor: '#6870B4',
        firstName: 'Sam',
        lastName: 'Smith',
        picture: 'user-image.png',
        id: '123456789',
        skill:
          'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
        status: 'Available',
        tasks: '2',
        information: {
          email: 'sample@gmail.com',
          phoneNumber: '+971505653793'
        },
        ratePerHour: '0000 AED'
      },
      {
        statusColor: '#6870B4',
        firstName: 'Sam',
        lastName: 'Smith',
        picture: 'user-image.png',
        id: '123456789',
        skill:
          'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
        status: 'Available',
        tasks: '2',
        information: {
          email: 'sample@gmail.com',
          phoneNumber: '+971505653793'
        },
        ratePerHour: '0000 AED'
      },
      {
        statusColor: '#6870B4',
        firstName: 'Sam',
        lastName: 'Smith',
        picture: 'user-image.png',
        id: '123456789',
        skill:
          'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
        status: 'Available',
        tasks: '2',
        information: {
          email: 'sample@gmail.com',
          phoneNumber: '+971505653793'
        },
        ratePerHour: '0000 AED'
      }
    ]
  };

  constructor() {}

  ngOnInit(): void {}
}
