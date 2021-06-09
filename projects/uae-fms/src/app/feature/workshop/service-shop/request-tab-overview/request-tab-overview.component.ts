import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnType } from '@core/table';
import { AssetMasterService } from '@feature/fleet/+state/assets/asset-master';
import {
  ServiceShopRequestFacade,
  ServiceShopRequestService
} from '@feature/workshop/+state/service-shop';
import moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-asset-overview-request',
  templateUrl: './request-tab-overview.component.html',
  styleUrls: ['./request-tab-overview.component.scss']
})
export class RequestTabOverviewServiceShopComponent implements OnInit {
  assetId: number;
  tableData$: Observable<any>;
  assetDetail$: Observable<any>;

  constructor(
    private _facadeRequest: ServiceShopRequestFacade,
    public _activatedRoute: ActivatedRoute,
    private assetMasterService: AssetMasterService,
    private router: Router,
    private service: ServiceShopRequestService
  ) {}

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

  jobCard_Table3 = {
    columns: [
      {
        lable: 'tables.column.request',
        field: 'request',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.date',
        field: 'date',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.description',
        field: 'description',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.request_type',
        field: 'requestType',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.reported_by',
        field: 'reportedBy',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.attachment',
        field: 'attachment',
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'downloadButtonRenderer'
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
          button: 'edit',
          color: '#3F3F3F',
          condition: (data) => {
            return data.approveStatus == 'APPROVED' ? false : true;
          },
          onClick: (col, data, button?) => {
            this._facadeRequest.resetParams();
            this.router.navigate(['edit-request/' + data.id], {
              relativeTo: this._activatedRoute
            });
          },
          permission:['WORKSHOP_SERVICE_SHOP_REQUEST_UPDATE_OWN' , 'WORKSHOP_SERVICE_SHOP_REQUEST_UPDATE_OTHERS']
        }
      ]
    }
  };

  section = 'list';

  ngOnInit(): void {
    this.assetId = +this._activatedRoute.snapshot.params.id;
    this._facadeRequest.resetParams();
    console.log(this.assetId);
    this._facadeRequest.getAssetRequest(this.assetId);
    this.tableData$ = this._facadeRequest.assetRequest$.pipe(
      map((x) => {
        if (x) {
          console.log(x);
          return x.map((request) => {
            let jobType;
            console.log(request);
            switch (request.jobType) {
              case 'TECHNICAL_REPORT':
                jobType = 'Technical Report';
                break;
              case 'NORMAL':
                jobType = 'Normal';
                break;
              case 'INSTALLATION':
                jobType = 'Installation';
                break;
              default:
                jobType = request.jobType;
                break;
            }
            return {
              ...request,
              date: moment.utc(request.updatedAt).local().format('DD-MM-YYYY'),
              requestType: jobType,
              attachment: request.documentIds,
              statusColor: '#6870B4'
            };
          });
        }
      })
    );
    this.assetDetail$ = this.assetMasterService.getAssetByID(this.assetId).pipe(
      map((x) => {
        return {
          message: {
            ...x.message,
            status: x.message.progressStatus
          }
        };
      })
    );
  }
}
