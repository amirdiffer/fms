import { Injectable, OnInit } from '@angular/core';
import { MenuPermission } from '@core/Permission/permission.model';
import { UserProfileFacade } from '@feature/user/state';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class SidebarMenuPermission extends MenuPermission{
  private _currentUser = null;
  public sidebarItem$ :Observable<ISidebar[]> = of(new Array<ISidebar>()) ;
  private _sidebarItem : ISidebar[] = [
    {
      name: 'sidebar.dashboard',
      icon: 'dashboard',
      route: '/dashboard',
      permission: {
        parent: 'DASHBOARD',
        permission: 'DASHBOARD',
      }
    },
    {
      name: 'sidebar.dashboard',
      icon: 'dashboard',
      route: '/dashboard/technician',
      permission: {
        parent: 'DASHBOARD',
        permission: 'DASHBOARD_TECHNICIAN',
      },
      items: [
        {
          name: 'home',
          route: '/dashboard/technician',
          icon: 'home',
          permission: {
            parent: 'DASHBOARD',
            permission: 'DASHBOARD_TECHNICIAN',
          }
        },
        {
          name: 'sidebar.mytasks',
          route: '/dashboard/technician/my-tasks',
          icon: 'tasks',
          permission: {
            parent: 'DASHBOARD',
            permission: 'DASHBOARD_TECHNICIAN',
          }
        },
        {
          name: 'sidebar.myrequests',
          route: '/dashboard/technician/my-requests',
          icon: 'list',
          permission: {
            parent: 'DASHBOARD',
            permission: 'DASHBOARD_TECHNICIAN',
          }
        }
      ]
    },
    {
      name: 'sidebar.fleets.~',
      icon: 'fleets',
      route: '/fleet',
      permission: {
        parent: 'FLEET',
        permission: 'FLEET',
      },
      items: [
        {
          name: 'sidebar.fleets.assets',
          icon: 'car-solid',
          route: '/fleet/assets',
          permission: {
            parent: 'FLEET',
            permission: 'ASSET',
          }
        },
        {
          name: 'sidebar.fleets.sub_assets',
          icon: 'sub-assets',
          route: '/fleet/sub-asset',
          permission: {
            parent: 'FLEET',
            permission: 'SUB_ASSET',
          }
        },
        {
          name: 'sidebar.fleets.accessory',
          icon: 'accessory',
          route: '/fleet/accessory',
          permission: {
            parent: 'FLEET',
            permission: 'ACCESSORY',
          }
        },
        {
          name: 'sidebar.fleets.operator',
          icon: 'operator',
          route: '/fleet/operator',
          permission: {
            parent: 'FLEET',
            permission: 'OPERATOR',
          }
        },
        {
          name: 'sidebar.fleets.department',
          icon: 'organization',
          route: '/fleet/department',
          permission: {
            parent: 'FLEET',
            permission: 'DEPARTMENT',
          }
        },
        {
          name: 'sidebar.fleets.movement.~',
          icon: 'movement',
          route: '/fleet/movement',
          permission: {
            parent: 'FLEET',
            permission: 'MOVEMENT',
          },
          items: [
            {
              name: 'sidebar.fleets.movement.permanent',
              route: '/fleet/movement/permanent'
            },
            {
              name: 'sidebar.fleets.movement.temporary',
              route: '/fleet/movement/temporary'
            }
            /* {
              name: 'sidebar.fleets.movement.iserve',
              route: '/fleet/movement/iserve'
            } */
          ]
        }
      ]
    },
    {
      name: 'sidebar.fuel_management',
      icon: 'fuel',
      route: '/fuel-management',
      permission: {
        parent: 'FUEL_MANAGEMENT',
        permission: 'FUEL_MANAGEMENT',
      }
    },
    {
      name: 'sidebar.traffic_fine.~',
      icon: 'traffic',
      route: '/traffic-fine',
      permission: {
        parent: 'TRRAFIC_FINE',
        permission: 'TRRAFIC_FINE',
      },
      items: [
        {
          name: 'sidebar.traffic_fine.overview',
          route: '/traffic-fine/overview',
          permission: {
            parent: 'TRRAFIC_FINE',
            permission: 'TRRAFIC_FINE',
          }
        },
        {
          name: 'sidebar.traffic_fine.traffic_file_number',
          route: '/traffic-fine/traffic-file-number',
          permission: {
            parent: 'TRRAFIC_FINE',
            permission: 'TRRAFIC_FINE',
          }
        },
      ]
    },
    {
      name: 'sidebar.toll',
      icon: 'toll',
      route: '/toll',
      permission: {
        parent: 'TRRAFIC_FINE',
        permission: 'TRRAFIC_FINE',
      }
    },
    {
      name: 'sidebar.workshop.~',
      icon: 'workshop',
      route: '/workshop',
      permission: {
        parent: 'WORKSHOP',
        permission: 'WORKSHOP',
      },
      items: [
        {
          name: 'sidebar.workshop.body_shop',
          icon: 'body-shop',
          route: '/workshop/body-shop',
          permission: {
            parent: 'WORKSHOP',
            permission: 'BODYSHOP',
          }
        },
        {
          name: 'sidebar.workshop.service_shop',
          icon: 'service-shop',
          route: '/workshop/service-shop',
          permission: {
            parent: 'WORKSHOP',
            permission: 'SERVICESHOP',
          }
        },
        {
          name: 'sidebar.workshop.location',
          icon: 'location',
          route: '/workshop/location',
          permission: {
            parent: 'WORKSHOP',
            permission: 'LOCATION',
          }
        },
        /* {
          name: 'sidebar.workshop.inspection.~',
          icon: 'inspection',
          route: '/workshop/inspections',
          items: [
            {
              name: 'sidebar.workshop.inspection.technical_inspection',
              route: '/workshop/inspections/technical-inspection'
            },
            {
              name: 'sidebar.workshop.inspection.auction_list',
              route: '/workshop/inspections/auction-list'
            }
          ]
        }, */
        {
          name: 'sidebar.workshop.task_master',
          icon: 'task-master',
          route: '/workshop/task-master',
          permission: {
            parent: 'WORKSHOP',
            permission: 'TASKMASTER',
          }
        }
      ]
    },
    {
      name: 'sidebar.part_store.~',
      icon: 'part-store',
      route: '/part-store',
      permission: {
        parent: 'PART_STORE',
        permission: 'PART_STORE',
      },
      items: [
        {
          name: 'sidebar.part_store.part_list',
          icon: 'part-list',
          route: '/part-store/part-list',
          permission: {
            parent: 'PART_STORE',
            permission: 'PART_LIST',
          }
        },
        {
          name: 'sidebar.part_store.order_list',
          icon: 'order-list',
          route: '/part-store/order-list/',
          permission: {
            parent: 'PART_STORE',
            permission: 'ORDER_LIST',
          },
          items: [
            {
              name: 'sidebar.part_store.asset',
              route: '/part-store/order-list/asset'
            },
            {
              name: 'sidebar.part_store.sub_asset',
              route: '/part-store/order-list/sub-asset'
            }
          ]
        },
        {
          name: 'sidebar.part_store.part_master',
          icon: 'part-master',
          route: '/part-store/part-master',
          permission: {
            parent: 'PART_STORE',
            permission: 'PART_MASTER',
          }
        }
      ]
    },
    /*{
        name: 'sidebar.report',
        icon: 'report',
        route: '/report',
        disabled: true
      }, */
    {
      name: 'sidebar.configuration.~',
      icon: 'configuration',
      route: '/configuration',
      permission: {
        parent: 'CONFIGURATION',
        permission: 'CONFIGURATION',
      },
      items: [
        {
          name: 'sidebar.configuration.user_management.~',
          icon: 'userManagement',
          route: '/configuration/user-management',
          permission: {
            parent: 'CONFIGURATION',
            permission: 'USER_MANAGEMENT',
          },
          items: [
            {
              name: 'sidebar.configuration.user_management.role_permission',
              icon: 'organization',
              route: '/configuration/user-management/role-permission'
            },
            {
              name: 'sidebar.configuration.user_management.users',
              icon: 'organization',
              route: '/configuration/user-management/users'
            }
            /* {
              name: 'sidebar.configuration.user_management.company_profile',
              icon: 'organization',
              route: '/configuration/user-management/company-setting',
              disabled: true
            } */
          ]
        },
        {
          name: 'sidebar.configuration.asset_policy',
          icon: 'asset-policy',
          route: '/configuration/asset-policy',
          permission: {
            parent: 'CONFIGURATION',
            permission: 'ASSET_POLICY',
          }
        },
        {
          name: 'sidebar.configuration.asset_configuration',
          icon: 'cog',
          route: '/configuration/asset-configuration',
          permission: {
            parent: 'CONFIGURATION',
            permission: 'FLEET_CONFIGURATION',
          }
        },
        {
          name: 'sidebar.configuration.business_category',
          icon: 'business',
          route: '/configuration/usage-category',
          permission: {
            parent: 'CONFIGURATION',
            permission: 'USAGE_CATEGORY',
          }
        },
        {
          name: 'sidebar.configuration.ownership',
          icon: 'copyright-solid',
          route: '/configuration/ownership',
          permission: {
            parent: 'CONFIGURATION',
            permission: 'OWNERSHIP',
          }
        },
        /* {
          name: 'sidebar.configuration.fleet_status',
          icon: 'flag-solid',
          route: '/configuration/fleet-status',
          disabled: true
        }, */
        {
          name: 'sidebar.configuration.periodic_service',
          icon: 'periodic-service',
          route: '/configuration/periodic-service',
          permission: {
            parent: 'CONFIGURATION',
            permission: 'PERIODIC_SERVICE',
          }
        }
      ]
    },
    {
      name: 'sidebar.integrations',
      icon: 'integrations',
      route: '/integration',
      disabled: true,
      permission: {
        parent: 'INTEGRATION',
        permission: 'INTEGRATION',
      }
    }
  ];
  constructor(private _facadeProfile: UserProfileFacade) {super();}

  public getUserPermission(){
    this._facadeProfile.loadData$.subscribe((user) => {
      if (user) {
        console.log(this._currentUser)
        this._currentUser = user;
        this.loadMenu();
      }
    });
  }
  private loadMenu(){
      let permissionModel = new MenuPermission();
      let sidebarModel: ISidebar[] = []
      if (this._currentUser.roles[0].roleId === 2) {
        permissionModel._dashboardPermission = {
          DASHBOARD: ['DONT_ALLOW'],
          DASHBOARD_TECHNICIAN: ['AlLOW_ALWAYS']
        };
      } else {
        permissionModel._dashboardPermission = {
          DASHBOARD: ['AlLOW_ALWAYS'],
          DASHBOARD_TECHNICIAN: ['DONT_ALLOW']
        };
      }
      this._sidebarItem.forEach(menu => {
        let parent = menu.permission?.parent;
        let permission = menu.permission?.permission;
        let _permissions = permissionModel.checkPermissions(parent,permission);
        let hasPermission = this.checkMenuPermission(_permissions);
        const checkItem =  (menu:ISidebar[]) => {
          let items : ISidebar[] =[]
          menu.forEach(x => {
            let itemParent = x.permission?.parent;
            let itemPermission = x.permission?.permission;
            let  _itemPermissions = permissionModel.checkPermissions(itemParent,itemPermission);
            let  itemHasPermission = this.checkMenuPermission(_itemPermissions);
            if(itemHasPermission){
              items.push({
                name: x.name,
                icon: x.icon,
                route:x.route,
                disabled:x.disabled ? x.disabled : false ,
                items :x.items ? x.items : null ,
              })
            }
          })
          return items;
        }
        if(hasPermission) {
          sidebarModel.push({
            name: menu.name,
            icon: menu.icon,
            route:menu.route,
            disabled:menu.disabled ? menu.disabled : false ,
            items :menu.items ? checkItem(menu.items) : null ,
          });
        }

      })
      this.sidebarItem$ = of(sidebarModel)
  }

  private checkMenuPermission(permission){
    let hasPermission = false;
    if (
      this._currentUser !== null &&
      this._currentUser.roles[0].permissions &&
      permission.length > 0
    ){
      for (const checkPermission of permission) {
        const permissionFound = this._currentUser.roles[0].permissions.find(
          (x) => x.toUpperCase() === checkPermission.toUpperCase()
        );
        if (permissionFound || checkPermission === 'AlLOW_ALWAYS') {
          return !hasPermission;
        }
        break;
      }
      return hasPermission;
    }
  }

}


export interface ISidebar{
    name: string;
    icon?: string;
    route:string;
    permission?: {
      parent: string;
      permission: string;
    },
    disabled?:boolean,
    items?:ISidebar[]
}

