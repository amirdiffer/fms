import { Component, OnInit } from '@angular/core';
import { assetsPath } from '@environments/environment';
import { ColumnType, TableSetting } from '@core/table';
import { map, tap } from 'rxjs/operators';
import { TrafficFineTableFacade } from '@feature/traffic-fine/+state/traffic-fine';
import { Router } from '@angular/router';

@Component({
  selector: 'anms-traffic-file-number',
  templateUrl: './traffic-file-number.component.html',
  styleUrls: ['./traffic-file-number.component.scss']
})
export class TrafficFileNumberComponent implements OnInit {

  assets = assetsPath;
  activeTab = 'Traffic Fine';
  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';

  trafficFine_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.traffic_file_number', type: 1, field: 'trafficFileNumber' },
      { lable: 'tables.column.status', type: 1, field: 'status' },
      // { lable: 'tables.column.create_date', type: 1, field: 'createDate' },
      { lable: 'tables.column.number_of_tickets', type: 1, field: 'numOfTickets' },
      { lable: 'tables.column.total_fine', type: 1, field: 'totalFine' },
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
          onClick: (arg1, arg2, arg3) => {
            this.router.navigate(['traffic-fine/edit-traffic-file/' + arg2.trafficFileNumber]).then();
          },
          permission: ['ASSET_VIEW_DETAILS_OWN', 'ASSET_VIEW_SUMMARY_OWN']
        }
      ]
    }
  };

  trafficFine$ = this.trafficFineFacade.trafficFine$.pipe(
    map(response => response.map((trafficFine: any) => {
      const date = new Date(trafficFine.updatedAt * 1000);
      return {
        id: trafficFine.id,
        trafficFileNumber: trafficFine.trafficFileNumber,
        numOfTickets: trafficFine.numOfTickets,
        totalFine: trafficFine.totalFine,
        status: trafficFine.isActive ? 'Active' : 'Inactive',
        createDate: `${date.getFullYear()}/${date.getDate()}/${date.getDay()}`
      };
    }))
  );

  constructor(private trafficFineFacade: TrafficFineTableFacade, private router: Router) {
  }

  ngOnInit(): void {
    this.trafficFineFacade.loadAll();
  }

  addClicked(): void {
    this.router.navigate(['traffic-fine/add-traffic-file']).then();
  }
}
