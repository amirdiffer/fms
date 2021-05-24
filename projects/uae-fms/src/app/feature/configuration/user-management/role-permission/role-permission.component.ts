import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnType, TableSetting } from '@core/table';
import { map } from 'rxjs/operators';
import { RolePermissionFacade } from '../../+state/role-permission';

@Component({
  selector: 'anms-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.scss']
})
export class RolePermissionComponent implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';
  data$ = this.facade.rolePermission$.pipe(
    map(
      x => {
        return x.map(y =>{
          return {...y , description:'No description' , numberOfUser:'No Number of User'}
        })
      }
    )
  )

  rolePermission_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.role_name', type: 1, field: 'roleName' },
      { lable: 'tables.column.description', type: 1, field: 'description' },
      { lable: 'tables.column.number_of_user', type: 1, field: 'numberOfUser' },
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
      onClick: (col, data, button?) => {},
      floatButton: [
        {
          button: 'external',
          onClick: (col, data, button?) => {
            this.facade.reset();
            this._router.navigate(['/configuration/user-management/role-permission/' + data.id]);
          }
        },
        {
          button: 'edit',
          color: '#3F3F3F',
          onClick: (col, data, button?) => {
            this.facade.reset();
            this._router.navigate(['/configuration/user-management/edit-role-permission/' + data.id]);
          }
        }
      ]
    }
  };

  constructor(private facade: RolePermissionFacade ,
              private _router:Router) {}

  ngOnInit(): void {
    this.facade.loadAll();
  }
}
