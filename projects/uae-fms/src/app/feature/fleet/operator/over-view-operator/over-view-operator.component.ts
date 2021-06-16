import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FilterCardSetting } from '@core/filter';
import { ColumnType, TableSetting } from '@core/table';
import { OperatorFacade, OperatorService } from '../../+state/operator';
import { map, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsFacade } from '@core/settings/settings.facade';
import { Observable, Subscription } from 'rxjs';
import { IOperator, IOperatorTrafficFine } from '@models/operator';
import { OperatorOverviewTabComponent } from './overview-tab/overview-tab.component';
import { OperatorTrafficFineFacade } from '../../+state/operator/traffic-fine-tab';
import { OperatorMovementHistoryFacade } from '../../+state/operator/movement-history-tab';
import { formatDate } from '@angular/common';
import { environment } from '@environments/environment';

@Component({
  selector: 'anms-over-view-operator',
  templateUrl: './over-view-operator.component.html',
  styleUrls: ['./over-view-operator.component.scss']
})
export class OverViewOperatorComponent implements OnInit, OnDestroy {
  //region Variable
  @ViewChild(OperatorOverviewTabComponent, { static: false }) overViewTab: OperatorOverviewTabComponent

  downloadBtn = 'assets/icons/download-solid.svg';
  search = 'assets/icons/search-solid.svg';
  selectedTab = '0';

  activeLang = '';

  trafficFineCount$ = this.trafficFineFacade.count$

  movementHistoryCount$ = this.movementHistoryFacade.count$

  count$ = this.facade.conut$.pipe(map((_) => 3456));

  activatedRouteSubscriber: Subscription
  operatorSubscriber: Subscription
  operatorDrivingLicenseSubscriber: Subscription
  operator: IOperator
  operator$: Observable<IOperator>
  trafficFineTableData: Observable<any>
  movementHistoryTableData: Observable<any>
  profilePicture = ''
  //#endregion

  //#region Table
  trafficFine_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.tc_code', type: 1, field: 'TC_Code', width: 100 },
      { lable: 'tables.column.type', type: 1, field: 'Type', width: 100 },
      {
        lable: 'tables.column.department',
        type: 1,
        field: 'Department',
        width: 150
      },
      {
        lable: 'tables.column.plate_no',
        type: 1,
        field: 'Plate_No',
        width: 100
      },
      {
        lable: 'tables.column.mission_status',
        type: 1,
        field: 'Mission_Status',
        width: 100
      },
      {
        lable: 'tables.column.time_date',
        type: 1,
        field: 'Time_Date',
        width: 100
      },
      {
        lable: 'tables.column.user_status',
        type: 1,
        field: 'userStatus',
        width: 100
      }
    ],
    data: [
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        userStatus: 'Sms',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        userStatus: 'Sms',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        userStatus: 'Sms',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        userStatus: 'Sms',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        userStatus: 'Sms',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        userStatus: 'Sms',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        userStatus: 'Sms',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        userStatus: 'Sms',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        userStatus: 'Sms',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      }
    ]
  };

  movementHistoryTable: TableSetting = {
    columns: [
      {
        lable: 'tables.column.asset',
        type: 1,
        field: 'asset',
        width: 250,
        renderer: 'assetsRenderer'
      },
      {
        lable: 'tables.column.duration',
        type: 1,
        field: 'duration',
        sortable: true
      },
      {
        lable: 'tables.column.start_date',
        type: 1,
        field: 'startDate',
        renderer: 'doubleLineRenderer'
      },
      {
        lable: 'tables.column.end_date',
        type: 1,
        field: 'endDate',
        renderer: 'doubleLineRenderer'
      },
      {
        lable: 'tables.column.department',
        type: 1,
        field: 'department'
      }
    ],
    data: []
  };

  activityTable: TableSetting = {
    columns: [
      {
        lable: 'tables.column.title',
        type: ColumnType.lable,
        field: 'title',
        width: 300,
        renderer: 'lowOpacityRenderer'
      },
      {
        lable: 'tables.column.date',
        type: ColumnType.lable,
        field: 'date',
        width: 100,
        renderer: 'doubleLineRenderer'
      }
    ],
    data: []
  };
  //#endregion

  //#region Filter
  trafficFinFilterCard: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.paid',
      filterCount: '2456',
      filterTagColor: '#42D0D9',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.unpainted',
      filterCount: '2456',
      filterTagColor: '#9967D9',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.deducte',
      filterCount: '12',
      filterTagColor: '#20E19D',
      onActive(index: number) {}
    }
  ];
  //#endregion

  constructor(
    private facade: OperatorFacade,
    private service: OperatorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private settingFacade: SettingsFacade,
    private trafficFineFacade: OperatorTrafficFineFacade,
    private movementHistoryFacade: OperatorMovementHistoryFacade,
  ) {}

  ngOnInit(): void {

    this.activatedRouteSubscriber = this.activatedRoute.params.subscribe((params) => {
      const id = params['id']
      this.getOperatorById(id);
      this.getOperatorsTrafficFine(id)
      this.getOperatorsMovementHistory(id)
    })

    this.settingFacade.language.subscribe((lang) => {
      this.activeLang = lang;
    });

    for (let i = 0; i < 9; i++) {
      this.movementHistoryTable.data.push({
        asset: {
          img: 'user-image.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        duration: '2 Days',
        startDate: { line1: 'Saturday 02/02', line2: '12:30' },
        endDate: { line1: 'Saturday 02/02', line2: '12:30' },
        department: 'Department Name'
      });
    }

    for (let i = 0; i < 9; i++) {
      this.activityTable.data.push({
        title: {
          column: 'Asset Assign',
          subtitle: 'Asset DPD123456 Assign To This User'
        },
        date: { line1: 'Saturday 02/02', line2: '12:30' }
      });
    }
  }

  backToOperatorTable(): void {
    this.router.navigate(['/fleet/operator']).then();
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscriber?.unsubscribe()
    this.operatorSubscriber?.unsubscribe()
    this.operatorDrivingLicenseSubscriber?.unsubscribe()
  }

  private getOperatorById(id: number): void {
    // this.operatorSubscriber = this.service.getOperatorById(id).pipe(
    //   tap(response => {
    //     this.operator = response.message
    //     this.profilePicture = environment.baseApiUrl + `document/${this.operator.profileDocId}`;
    //     this.overViewTab.operator = this.operator
    //   })
    // ).subscribe()

    this.operator$ = this.service.getOperatorById(id).pipe(
      map(response => {
        return response.message
      })
    )
  }

 

  private getOperatorsTrafficFine(id: number): void {

    this.trafficFineFacade.loadAll(id)
    this.trafficFineTableData = this.trafficFineFacade.trafficFine$.pipe(
      map(trafficFineArray => trafficFineArray.map((trafficFine => (
        {
          TC_Code: trafficFine.tcCode,
          Type: trafficFine.userStatus,
          Department: trafficFine.department.name,
          Plate_No: trafficFine.plateNumber,
          Mission_Status: trafficFine.missionStatus,
          Time_Date: trafficFine.time,
          userStatus: trafficFine.userStatus,
        }
      ))))
    )
  }

  private getOperatorsMovementHistory(id: number): void {

    this.movementHistoryFacade.loadAll(id)
    this.movementHistoryTableData = this.movementHistoryFacade.movementHistory$.pipe(
      map(movementHistoryArray => movementHistoryArray.map((movementHistory => {
        const startDate = new Date(movementHistory.startDate * 1000);
        const formattedStartDateLine1 = formatDate(startDate, 'EEEE MM-dd ', 'en-US')
        const formattedStartDateLine2 = formatDate(startDate, 'hh:mm', 'en-US')
        const endDate = new Date(movementHistory.startDate * 1000);
        const formattedEndDateLine1 = formatDate(endDate, 'EEEE MM-dd', 'en-US')
        const formattedEndDateLine2 = formatDate(endDate, 'hh:mm', 'en-US')
        const duration = `${Math.abs(new Date(endDate).getDay() - new Date(startDate).getDay())} Days`
        return {
          asset: {
            img: 'assets/thumb.png',
            assetSubName: movementHistory.asset.dpd,
            ownership: movementHistory.asset.ownershipType,
          },
          duration: duration,
          startDate: { line1: formattedStartDateLine1, line2: formattedStartDateLine2 },
          endDate: { line1: formattedEndDateLine1, line2: formattedEndDateLine2 },
          department: movementHistory.department.name
        }
      })))
    )
  }
}
