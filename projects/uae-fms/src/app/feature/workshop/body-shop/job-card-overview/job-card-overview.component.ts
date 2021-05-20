import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnType } from '@core/table';
import { AssetMasterFacade, AssetMasterService } from '@feature/fleet/+state/assets/asset-master';
import { Subject } from 'rxjs';
import { BodyShopJobCardService } from "../../+state/body-shop/job-card/body-shop-job-card.service";

@Component({
  selector: 'anms-job-card-overview',
  templateUrl: './job-card-overview.component.html',
  styleUrls: ['./job-card-overview.component.scss']
})
export class JobCardOverviewComponent implements OnInit {

  assetId;
  jobcardId;
  assetDetail;
  sidebarData = new Subject();
  sidebarData$ = this.sidebarData.asObservable();

  tasksData = new Subject();
  tableData$ = this.tasksData.asObservable();

  jobCartsData = new Subject<any[]>();
  tableData2$ = this.jobCartsData.asObservable();


  vehicle = {
    id: 1,
    make: 'bmw.png',
    vehicle: 'Request No 123456',
    thumb: 'thumb1.png',
    type: 'bmw',
    model: 'I3',
    plateno: '1234',
    iserve: '04',
    status: '1',
    location: 'Al Ghandi Ato Service Ras A Khor',
    bodyType: 'Text Type',
    color: 'Text Type',
    trim: 'Text Type',
    group: 'Text Type',
    department: 'Dep Name-Area-Dubai',
    licensePlate: '123456',
    operator: 'User Name',
    salik: 'Assign',
    warranty: 'Under Warranty',
    vin_sn: 'JTDKBRFU9J30593O7',
    year: '2020'
  };

  filterSetting = [
    {
      filterTitle: 'statistic.total',
      filterSupTitle: 'statistic.issue',
      filterCount: '13',
      filterTagColor: '#6EBFB5'
    },
    {
      filterTitle: 'statistic.todo',
      filterSupTitle: 'statistic.issue',
      filterCount: '08',
      filterTagColor: '#6870B4'
    },
    {
      filterTitle: 'statistic.doing',
      filterSupTitle: 'statistic.issue',
      filterCount: '02',
      filterTagColor: '#BA7967'
    },
    {
      filterTitle: 'statistic.done',
      filterSupTitle: 'statistic.issue',
      filterCount: '09',
      filterTagColor: '#DD5648'
    }
  ];

  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  activeLayout = 'menu';

  jobCard_Table = {
    columns: [
      {
        lable: 'tables.column.name',
        field: 'name',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.shopType',
        field: 'shopType',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.instruction',
        field: 'instruction',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      /* {
        lable: 'tables.column.description',
        field: 'description',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      }, */
      {
        lable: 'tables.column.ratePerHour',
        field: 'ratePerHour',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.taskType',
        field: 'taskType',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.timeEstimate',
        field: 'timeEstimate',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'floatButton',
        hasJobCardButton: false
      }
    ],
    data: [],
    rowSettings: {
      onClick: (col, data, button?) => { },
      floatButton: [
        {
          button: 'edit',
          onClick: (col, data) => {
            this.router
              .navigate(['/workshop/body-shop/edit-job-card/' + data.id])
              .then();
          }
        }
        // {
        //   button: 'edit',
        //   color: '#3F3F3F',
        //   onClick: (col, data, button?) => {
        //     this._facadeRequest.resetParams();
        //     this.router.navigate([
        //       '/workshop/body-shop/edit-request/' + data.id
        //     ]);
        //   }
        // }
      ]
    }

  };

  section = 'list';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: BodyShopJobCardService,
    private assetService: AssetMasterService
  ) {
    this.tasksData.next([]);
    this.jobCartsData.next([]);
  }

  ngOnInit(): void {
    this.route.params.subscribe(x => {
      if (!x?.id) this.router.navigate(["/workshop/body-shop"]);
      this.jobcardId = x.id;
      this.service.getJobCardById(x.id).subscribe(m => {
        this.sidebarData.next(m);

        this.tasksData.next(m.message?.tasks?.map(a => {
          return a.taskMaster
        }));
        this.assetService.getAssetByID(m.message.assetId).subscribe(z => {
          this.assetId = z.message.id;

          this.service.getAllActiveJobcards(this.assetId).subscribe((y: any) => {
            this.jobCartsData.next(y?.message?.tasks.map(a => a.taskMaster));
          });
        })
      })
    })

  }

}
