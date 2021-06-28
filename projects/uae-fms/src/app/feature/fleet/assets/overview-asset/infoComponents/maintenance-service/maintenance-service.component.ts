import { Component, OnInit } from '@angular/core';
import { ColumnType } from '@core/table';

@Component({
  selector: 'app-asset-overview-maintenance-service',
  templateUrl: './maintenance-service.component.html',
  styleUrls: ['./maintenance-service.component.scss']
})
export class MaintenanceServiceComponent implements OnInit {

  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  tableSetting = {
    columns: [
      {
        lable: 'tables.column.intervals',
        field: 'intervals',
        type: ColumnType.lable,
        width: 300,
        thumbField: ''
      },
      {
        lable: 'tables.column.service_tasks',
        field: 'service_tasks',
        type: ColumnType.lable,
        thumbField: ''
      },
      {
        lable: '',
        field: 'dropdownRenderer',
        type: ColumnType.lable,
        renderer: 'dropdownRenderer'
      }
    ],
    data: [
      {
        id: 1,
        intervals: 'Every 150 miles',
        service_tasks: 'AC.Compressor Service '
      },
      {
        id: 2,
        intervals: 'Every 150 miles',
        service_tasks: 'AC.Compressor Service '
      },
      {
        id: 3,
        intervals: 'Every 150 miles',
        service_tasks: 'AC.Compressor Service '
      }
    ],
    rowSettings: {
      floatButton: []
    }
  };
  subTableSetting = {
    columns: [
      {
        lable: 'tables.column.task',
        field: 'task',
        type: ColumnType.lable,
        // width: 300,
        thumbField: ''
      },
      {
        lable: 'tables.column.duration',
        field: 'duration',
        type: ColumnType.lable,
        // width: 300,
        thumbField: ''
      },
      {
        lable: 'tables.column.status',
        field: 'status',
        type: ColumnType.lable,
        // width: 300,
        thumbField: ''
      },
      {
        lable: 'tables.column.start_date',
        field: 'start_date',
        type: ColumnType.lable,
        // width: 300,
        thumbField: ''
      },
      {
        lable: 'tables.column.technician',
        field: 'technician',
        type: ColumnType.lable,
        // width: 300,
        thumbField: ''
      },
      {
        lable: 'tables.column.cost',
        field: 'cost',
        type: ColumnType.lable,
        // width: 300,
        thumbField: ''
      },
      {
        lable: 'tables.column.part_cost',
        field: 'part_cost',
        type: ColumnType.lable,
        // width: 300,
        thumbField: ''
      },
      {
        lable: 'tables.column.total_cost',
        field: 'total_cost',
        type: ColumnType.lable,
        // width: 300,
        thumbField: ''
      }
    ],
    data: [
      {
        task: 'AC.Compressor Service',
        duration: '5 Hours',
        status: 'Started',
        start_date: '02/02/2020',
        technician: 'Atefeh',
        cost: '2300 AED',
        part_cost: '2300 AED',
        total_cost: '4700 AED'
      },
      {
        task: 'AC.Compressor Service',
        duration: '5 Hours',
        status: 'Started',
        start_date: '02/02/2020',
        technician: 'Atefeh',
        cost: '2300 AED',
        part_cost: '2300 AED',
        total_cost: '4700 AED'
      },
      {
        task: 'AC.Compressor Service',
        duration: '5 Hours',
        status: 'Started',
        start_date: '02/02/2020',
        technician: 'Atefeh',
        cost: '2300 AED',
        part_cost: '2300 AED',
        total_cost: '4700 AED'
      },
      {
        task: 'AC.Compressor Service',
        duration: '5 Hours',
        status: 'Started',
        start_date: '02/02/2020',
        technician: 'Atefeh',
        cost: '2300 AED',
        part_cost: '2300 AED',
        total_cost: '4700 AED'
      }
    ],
    rowSettings: {
      floatButton: []
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

  filterSubTableData(id: number) {
  }

}
