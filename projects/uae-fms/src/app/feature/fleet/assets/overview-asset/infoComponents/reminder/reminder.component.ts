import { Component, OnInit } from '@angular/core';
import { ColumnType } from '@core/table';

@Component({
  selector: 'app-asset-overview-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  section = 'list';
  tableSetting = {
    columns: [
      {
        lable: 'tables.column.type_category',
        field: 'type_category',
        type: ColumnType.lable,
        thumbField: ''
      },
      {
        lable: 'tables.column.time',
        field: 'time',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.description',
        field: 'description',
        type: ColumnType.lable,
        width: 300,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.reminder',
        field: 'toggleRenderer',
        type: ColumnType.lable,
        renderer: 'toggleRenderer'
      }
    ],
    data: [
      {
        type_category: 'Change Oil',
        time: 'Every (100 KM)',
        description: 'Description is here, description is here',
        toggleRenderer: true
      },
      {
        type_category: 'Change Oil',
        time: 'Every (100 KM)',
        description: 'Description is here, description is here',
        toggleRenderer: true
      },
      {
        type_category: 'Change Oil',
        time: 'Every (100 KM)',
        description: 'Description is here, description is here',
        toggleRenderer: false
      },
      {
        type_category: 'Change Oil',
        time: 'Every (100 KM)',
        description: 'Description is here, description is here',
        toggleRenderer: true
      },
    ],
    rowSettings: {
      onClick: (col, data, button?, val?) => {
        if (button == 'toggle') {
        }
      },
      floatButton: []
    }
  };

  option = [
    { name: 'Option 1', id: 1 },
    { name: 'Option 2', id: 2 },
    { name: 'Option 3', id: 3 },
    { name: 'Option 4', id: 4 },
    { name: 'Option 5', id: 5 }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
