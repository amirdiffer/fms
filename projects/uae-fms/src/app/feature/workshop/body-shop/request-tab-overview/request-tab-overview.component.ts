import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnType } from '@core/table';
import { AssetMasterFacade } from '@feature/fleet/+state/assets/asset-master';
import { BodyShopRequestFacade, BodyShopRequestService } from '@feature/workshop/+state/body-shop';
import moment from 'moment';
import { map } from 'rxjs/operators';
import { AssetMasterService } from '@feature/fleet/+state/assets/asset-master'

@Component({
  selector: 'app-asset-overview-request',
  templateUrl: './request-tab-overview.component.html',
  styleUrls: ['./request-tab-overview.component.scss']
})
export class RequestTabOverviewComponent implements OnInit {
  assetId;
  tableData$;
  assetDetail;
  constructor(
    private _facadeRequest: BodyShopRequestFacade,
    private _activatedRoute: ActivatedRoute,
    private _assetMasterFacade: AssetMasterFacade,
    private route: ActivatedRoute,
    private router: Router,
    private assetService: AssetMasterService,
    private service: BodyShopRequestService
  ) { }

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
          onClick: (col, data, button?) => {
            this._facadeRequest.resetParams();
            this.router.navigate([
              '/workshop/body-shop/edit-request/' + data.id
            ]);
          }
        }
      ]
    }
  };

  section = 'list';

  ngOnInit(): void {
    this.assetId = this._activatedRoute.snapshot.params.id;
    this._assetMasterFacade.loadAll();
    this.tableData$ = this.service.getRequestById(this.assetId).pipe(
      map((y) => {
        let x=y.message;
        return x.map((y) => {
          let jobType;
          switch (y.jobType) {
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
              jobType = y.jobType;
              break;
          }
          return {
            ...y,
            date: moment.utc(y.updatedAt).local().format('DD-MM-YYYY'),
            requestType: jobType,
            attachment: y.documentIds,
            statusColor: '#6870B4'
          };
        });
      })
    );
    this._facadeRequest.assetRequest$.subscribe((x) => {
      if (x.length < 1) {
        this._facadeRequest.getAssetRequest(this.assetId);
      }
    });
    this.route.params.subscribe((x) => {
      if (x?.id) this._assetMasterFacade.getAssetByID(x.id);
    });

    this.assetService.getAssetByID(this.assetId).subscribe(x => {
      this.assetDetail = x.message;
    })
  }
}
