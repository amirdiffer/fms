import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnType, TableSetting } from '@core/table';
import { Subject } from 'rxjs';
import { AllRequestsNetworkService } from '@feature/technician/+state/my-requests/all-requests/all-requests-network.service';
import { PartRequestsNetworkService } from '@feature/technician/+state/my-requests/part-requests/part-requests-network.service';
import { TechnicalInspectionRequestsNetworkService } from '@feature/technician/+state/my-requests/technical-inspection-requests/technical-inspection-requests-network.service';

@Component({
  selector: 'anms-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss']
})
export class MyRequestsComponent implements OnInit {
  selectedTab;

  //#region Filter
  filterSetting = [
    {
      filterTitle: 'statistic.total',
      filterCount: '10',
      filterTagColor: '#028D5D'
    },
    {
      filterTitle: 'statistic.active',
      filterCount: '2',
      filterTagColor: '#009EFF'
    },
    {
      filterTitle: 'statistic.inactive',
      filterCount: '12',
      filterTagColor: '#FCB614'
    },
    {
      filterTitle: 'statistic.xfleet',
      filterCount: '12',
      filterTagColor: '#F75A4A'
    }
  ];
  //#endregion

  //#region Tables
  allRequests = new Subject();
  allRequests$ = this.allRequests.asObservable();
  allRequestsSetting: TableSetting = {
    columns: [
      {
        lable: 'tables.column.task',
        type: 1,
        field: 'task',
        renderer: ''
      },
      {
        lable: 'tables.column.priority',
        type: 1,
        field: 'priority',
        renderer: ''
      },
      {
        lable: 'tables.column.progress',
        type: 1,
        field: 'progress',
        renderer: ''
      },
      {
        lable: 'tables.column.status',
        type: 1,
        field: 'status',
        renderer: ''
      },
      {
        lable: 'tables.column.action',
        type: 1,
        field: 'action',
        renderer: ''
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'floatButton'
      }
    ],
    data: [],
    rowSettings: {
      floatButton: [
        {
          button: 'external',
          onClick: (col, data) => {
            this.router.navigate(['overview' + data.id]);
          }
        }
      ]
    }
  };
  partRequests = new Subject();
  partRequests$ = this.partRequests.asObservable();
  partRequestsSetting: TableSetting = {
    columns: [
      {
        lable: 'tables.column.task',
        type: 1,
        field: 'task',
        renderer: ''
      },
      {
        lable: 'tables.column.priority',
        type: 1,
        field: 'priority',
        renderer: ''
      },
      {
        lable: 'tables.column.progress',
        type: 1,
        field: 'progress',
        renderer: ''
      },
      {
        lable: 'tables.column.status',
        type: 1,
        field: 'status',
        renderer: ''
      },
      {
        lable: 'tables.column.action',
        type: 1,
        field: 'action',
        renderer: ''
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'floatButton'
      }
    ],
    data: [],
    rowSettings: {
      floatButton: [
        {
          button: 'external',
          onClick: (col, data) => {
            this.router.navigate(['overview' + data.id]);
          }
        }
      ]
    }
  };
  technicalInspection = new Subject();
  technicalInspection$ = this.technicalInspection.asObservable();
  technicalInspectionSetting: TableSetting = {
    columns: [
      {
        lable: 'tables.column.task',
        type: 1,
        field: 'task',
        renderer: ''
      },
      {
        lable: 'tables.column.priority',
        type: 1,
        field: 'priority',
        renderer: ''
      },
      {
        lable: 'tables.column.progress',
        type: 1,
        field: 'progress',
        renderer: ''
      },
      {
        lable: 'tables.column.status',
        type: 1,
        field: 'status',
        renderer: ''
      },
      {
        lable: 'tables.column.action',
        type: 1,
        field: 'action',
        renderer: ''
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'floatButton'
      }
    ],
    data: [],
    rowSettings: {
      floatButton: [
        {
          button: 'external',
          onClick: (col, data) => {
            this.router.navigate(['overview' + data.id]);
          }
        }
      ]
    }
  };

  //#endregion

  constructor(
    private router: Router,
    private allRequestsNetworkService: AllRequestsNetworkService,
    private partRequestsNetworkService: PartRequestsNetworkService,
    private technicalInspectionRequestsNetworkService: TechnicalInspectionRequestsNetworkService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.allRequests.next([
        {
          task: 'Do Something',
          priority: 'High',
          progress: '20%',
          status: 'In Progress',
          action: ''
        },
        {
          task: 'Do Something',
          priority: 'High',
          progress: '20%',
          status: 'In Progress',
          action: ''
        },
        {
          task: 'Do Something',
          priority: 'High',
          progress: '20%',
          status: 'In Progress',
          action: ''
        },
        {
          task: 'Do Something',
          priority: 'High',
          progress: '20%',
          status: 'In Progress',
          action: ''
        },
        {
          task: 'Do Something',
          priority: 'High',
          progress: '20%',
          status: 'In Progress',
          action: ''
        }
      ]);
      this.partRequests.next([
        {
          task: 'Do Something',
          priority: 'High',
          progress: '20%',
          status: 'In Progress',
          action: ''
        },
        {
          task: 'Do Something',
          priority: 'High',
          progress: '20%',
          status: 'In Progress',
          action: ''
        },
        {
          task: 'Do Something',
          priority: 'High',
          progress: '20%',
          status: 'In Progress',
          action: ''
        },
        {
          task: 'Do Something',
          priority: 'High',
          progress: '20%',
          status: 'In Progress',
          action: ''
        },
        {
          task: 'Do Something',
          priority: 'High',
          progress: '20%',
          status: 'In Progress',
          action: ''
        }
      ]);
      this.technicalInspection.next([
        {
          task: 'Do Something',
          priority: 'High',
          progress: '20%',
          status: 'In Progress',
          action: ''
        },
        {
          task: 'Do Something',
          priority: 'High',
          progress: '20%',
          status: 'In Progress',
          action: ''
        },
        {
          task: 'Do Something',
          priority: 'High',
          progress: '20%',
          status: 'In Progress',
          action: ''
        },
        {
          task: 'Do Something',
          priority: 'High',
          progress: '20%',
          status: 'In Progress',
          action: ''
        },
        {
          task: 'Do Something',
          priority: 'High',
          progress: '20%',
          status: 'In Progress',
          action: ''
        }
      ]);
    }, 1000);

    this.getAllRequests();
    this.getPartRequests();
    this.getTechnicalInspectionRequests();
  }

  private getAllRequests(): void {
    this.allRequestsNetworkService.getAllRequests().subscribe((response) => {
      const allRequests = response.message;

      const allRequestsArray = [];
      allRequests.map((request) => {
        const requestObject = {
          task: request.taskMaster.name,
          priority: request.priorityOrder,
          progress: 10,
          status: request.status
        };
        allRequestsArray.push(requestObject);
      });

      if (allRequestsArray.length) {
        this.allRequests.next(allRequestsArray);
      }
    });
  }

  private getPartRequests(): void {
    this.partRequestsNetworkService.getPartRequests().subscribe((response) => {
      const partRequests = response.message;

      const partRequestsArray = [];
      partRequests.map((request) => {
        const partRequestObject = {
          task: request.taskMaster.name,
          priority: request.priorityOrder,
          progress: 10,
          status: request.status
        };
        partRequestsArray.push(partRequestObject);
      });

      if (partRequestsArray.length) {
        this.partRequests.next(partRequestsArray);
      }
    });
  }

  private getTechnicalInspectionRequests(): void {
    this.technicalInspectionRequestsNetworkService
      .getTechincalInspectionRequests()
      .subscribe((response) => {
        const technicalInspectionRequests = response.message;

        const technicalInspectionRequestsArray = [];
        technicalInspectionRequests.map((request) => {
          const technicalInspectionRequestObject = {
            task: request.taskMaster.name,
            priority: request.priorityOrder,
            progress: 10,
            status: request.status
          };
          technicalInspectionRequestsArray.push(
            technicalInspectionRequestObject
          );
        });

        if (technicalInspectionRequestsArray.length) {
          this.technicalInspection.next(technicalInspectionRequestsArray);
        }
      });
  }
}
