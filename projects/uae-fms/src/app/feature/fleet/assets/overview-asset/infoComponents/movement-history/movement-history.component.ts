import { Component, OnInit } from '@angular/core';
import { ColumnType } from '@core/table';

@Component({
  selector: 'app-asset-overview-movement-history',
  templateUrl: './movement-history.component.html',
  styleUrls: ['./movement-history.component.scss']
})
export class MovementHistoryComponent implements OnInit {

  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';

  tableSetting = {
    columns: [
      {
        lable: 'tables.column.duration',
        field: 'duration',
        type: ColumnType.lable,
        thumbField: ''
      },
      {
        lable: 'tables.column.start_date',
        field: 'start_date',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.end_date',
        field: 'end_date',
        type: ColumnType.lable,
        width: 300,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.department',
        field: 'department',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.operator',
        field: 'Operator',
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'doubleLineRenderer'
      },
      {
        lable: 'tables.column.type',
        field: 'type',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
    ],
    data: [
      {
        duration: '2 Days',
        start_date: '2020/02/02 12:30',
        end_date: '2020/02/04 12:30',
        department: 'Department Name',
        Operator: {
          line1: 'Sam Smith',
          line2:'1234567899'
        },
        type: 'Temporary',
      },
      {
        duration: '2 Days',
        start_date: '2020/02/02 12:30',
        end_date: '2020/02/04 12:30',
        department: 'Department Name',
        Operator: {
          line1: 'Sam Smith',
          line2:'1234567899'
        },
        type: 'Temporary',
      },
      {
        duration: '2 Days',
        start_date: '2020/02/02 12:30',
        end_date: '2020/02/04 12:30',
        department: 'Department Name',
        Operator: {
          line1: 'Sam Smith',
          line2:'1234567899'
        },
        type: 'Temporary',
      },
      {
        duration: '2 Days',
        start_date: '2020/02/02 12:30',
        end_date: '2020/02/04 12:30',
        department: 'Department Name',
        Operator: {
          line1: 'Sam Smith',
          line2:'1234567899'
        },
        type: 'Temporary',
      },
      {
        duration: '2 Days',
        start_date: '2020/02/02 12:30',
        end_date: '2020/02/04 12:30',
        department: 'Department Name',
        Operator: {
          line1: 'Sam Smith',
          line2:'1234567899'
        },
        type: 'Temporary',
      },
      {
        duration: '2 Days',
        start_date: '2020/02/02 12:30',
        end_date: '2020/02/04 12:30',
        department: 'Department Name',
        Operator: {
          line1: 'Sam Smith',
          line2:'1234567899'
        },
        type: 'Temporary',
      },
      {
        duration: '2 Days',
        start_date: '2020/02/02 12:30',
        end_date: '2020/02/04 12:30',
        department: 'Department Name',
        Operator: {
          line1: 'Sam Smith',
          line2:'1234567899'
        },
        type: 'Temporary',
      },
      {
        duration: '2 Days',
        start_date: '2020/02/02 12:30',
        end_date: '2020/02/04 12:30',
        department: 'Department Name',
        Operator: {
          line1: 'Sam Smith',
          line2:'1234567899'
        },
        type: 'Temporary',
      }
    ],
    rowSettings: {}
  };

  constructor() { }

  ngOnInit(): void {
  }

}
