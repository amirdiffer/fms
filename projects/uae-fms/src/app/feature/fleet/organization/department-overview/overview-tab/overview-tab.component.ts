import { Component, Injector, OnInit } from '@angular/core';
import { ColumnType, TableSetting } from '@core/table';
import { map } from 'rxjs/operators';
import { OrganizationFacade } from '@feature/fleet/+state/organization';
import { Utility } from '@shared/utility/utility';
import { SettingsFacade } from '@core/settings/settings.facade';
import { FilterCardSetting } from '@core/filter';

@Component({
  selector: 'anms-overview-tab',
  templateUrl: './overview-tab.component.html',
  styleUrls: ['./overview-tab.component.scss']
})
export class OverviewTabComponent extends Utility implements OnInit {

  //region Variable
  activeLang = '';
  isEditingDepartmentInfo = true; // TODO: set to false later
  //#endregion

  //#region Table
  organizationTable: TableSetting = {
    columns: [
      {
        lable: 'tables.column.section',
        type: 1,
        field: 'Section'
      },
      {
        lable: 'tables.column.location',
        type: 1,
        field: 'Location'
      },
      {
        lable: 'tables.column.tf_payed',
        type: 1,
        field: 'TF_Payed'
      },
      {
        lable: 'tables.column.tf_unpaid',
        type: 1,
        field: 'TF_Unpaid'
      },
      {
        lable: '<img src="assets/icons/operator.svg">',
        type: 1,
        sortable: true,
        isIconLable: true,
        field: 'user',
        width: 100
      },
      {
        lable: '<img src="assets/icons/car-solid.svg">',
        type: 1,
        isIconLable: true,
        field: 'car',
        width: 100,
        sortable: true
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
    data: []
  };

  data$ = this.facade.organization$.pipe(
    map((x) => {
      return x.map((y) => {
        return {
          ...y,
          Section: y.numOfDepartments,
          Location: y.numOfLocations,
          car: y.numOfAssets,
          user: y.numOfUsers,
          TF_Unpaid: y.tfUnpaid,
          TF_Payed: y.tfPaid
        };
      });
    })
  );
  //#endregion

  constructor(private facade: OrganizationFacade, private settingFacade: SettingsFacade, private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.settingFacade.language.subscribe((lang) => (this.activeLang = lang));
  }

  onDepartmentInfoEdit(): void {
    this.isEditingDepartmentInfo = !this.isEditingDepartmentInfo;
  }

}
