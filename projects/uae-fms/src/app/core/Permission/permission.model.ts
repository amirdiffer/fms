export class MenuPermission {
    private _dashboardPermission : any;
    private _fleetPermission : any;
    private _fuelManagementPermission: any;
    private _trafficFinesPermisssion: any;
    private _tollPermission: any;
    private _workshopPermission: any;
    private _partStorePermission: any;
    private _configurationPermission: any;
    private _integrationPermission: any;



    constructor(){
        /* '''''Dashboard''''' */
        this._dashboardPermission = {
            DASHBOARD:[
                "AlLOW_ALWAYS"
            ]
        }



        /* '''''Fleet''''' */
        this._fleetPermission = {
            ASSET: [
                "ASSET_VIEW_LIST_MASTER_OWN",
                "ASSET_VIEW_LIST_PENDING_OWN",
                "ASSET_VIEW_LIST_CUSTOMIZATION_OWN",
                "ASSET_VIEW_LIST_MASTER_OTHERS",
                "ASSET_VIEW_LIST_PENDING_OTHERS",
                "ASSET_VIEW_LIST_CUSTOMIZATION_OTHERS",
                "ASSET_ADD"
            ],
            SUB_ASSET:[
                "SUB_ASSET_VIEW_LIST_OWN",
                "SUB_ASSET_VIEW_LIST_OTHERS",
                "SUB_ASSET_ADD",
                
            ],
            ACCESSORY:[
                "ACCESSORY_VIEW_LIST_OWN",
                "ACCESSORY_VIEW_LIST_OTHERS",
                "ACCESSORY_ADD",
            ],
            OPERATOR:[
                "USER_OPERATOR_VIEW_LIST",
                "USER_OPERATOR_ADD",
            ],
            DEPARTMENT:[
                "ORGANIZATION_VIEW_LIST",
                "ORGANIZATION_ADD",
            ],
            MOVEMENT:[
                "MOVEMENT_REQUEST_VIEW_LIST_OWN",
                "MOVEMENT_REQUEST_VIEW_LIST_OTHERS",
                "MOVEMENT_VIEW_LIST_OWN",
                "MOVEMENT_VIEW_LIST_OTHERS",
                "MOVEMENT_REQUEST_ADD",
            ]
        };


        /* '''''Fuel Management''''' */
        this._fuelManagementPermission ={
            FUEL_MANAGEMENT:[
                "FUEL_CARD_VIEW_LIST",
                "FUEL_CARD_VIEW_LIST_ASSET_USAGE",
            ]
        };


        /* '''''Traffic Fine''''' */
        this._trafficFinesPermisssion = {
            TRRAFIC_FINE : [
                'ANY_PERMISSION'
            ]
        };


        /* '''''Toll''''' */
        this._tollPermission = {
            TOLL:[
                'ANY_PERMISSION'
            ]
        };

        /* '''''Workshop''''' */
        this._workshopPermission = {
            BODYSHOP :[
                "WORKSHOP_BODY_SHOP_REQUEST_OF_ASSET_VIEW_LIST_OWN",
                "WORKSHOP_BODY_SHOP_REQUEST_OF_ASSET_VIEW_LIST_OTHERS",
                "WORKSHOP_BODY_SHOP_JOB_CARD_VIEW_LIST",
                "WORKSHOP_BODY_SHOP_TECHNICIAN_VIEW_LIST",
                "WORKSHOP_BODY_SHOP_LOCATION_VIEW_LIST",
                "WORKSHOP_BODY_SHOP_REQUEST_ADD",
                "WORKSHOP_BODY_SHOP_TECHNICIAN_ADD",
                "WORKSHOP_BODY_SHOP_LOCATION_ADD",
                "WORKSHOP_BODY_SHOP_JOB_CARD_OPEN_CLOSE"

            ],
            SERVICESHOP:[
                "WORKSHOP_SERVICE_SHOP_REQUEST_OF_ASSET_VIEW_LIST_OWN",
                "WORKSHOP_SERVICE_SHOP_REQUEST_OF_ASSET_VIEW_LIST_OTHERS",
                "WORKSHOP_SERVICE_SHOP_JOB_CARD_VIEW_LIST",
                "WORKSHOP_SERVICE_SHOP_TECHNICIAN_VIEW_LIST",
                "WORKSHOP_SERVICE_SHOP_LOCATION_VIEW_LIST",
                "WORKSHOP_SERVICE_SHOP_REQUEST_ADD",
                "WORKSHOP_SERVICE_SHOP_TECHNICIAN_ADD",
                "WORKSHOP_SERVICE_SHOP_LOCATION_ADD",
                "WORKSHOP_SERVICE_SHOP_JOB_CARD_OPEN_CLOSE",
            ],
            LOCATION:[
                ''
            ],
            TASKMASTER:[
                "TASK_MASTER_VIEW_LIST",
                "TASK_MASTER_ADD",
            ]
        };

        /* '''''Part Store''''' */
        this._partStorePermission = {
            PART_LIST:[
                "PARTSTORE_PART_VIEW_LIST",
            ],
            ORDER_LIST:[
                "PARTSTORE_ORDER_LIST_REQUEST_VIEW_LIST_OWN",
                "PARTSTORE_ORDER_LIST_REQUEST_VIEW_LIST_OTHERS",
                "PARTSTORE_ORDER_LIST_ORDER_VIEW_LIST",
                "PARTSTORE_SUPPLIER_VIEW_LIST",
                "PARTSTORE_ORDER_LIST_ORDER_ADD",
                "PARTSTORE_ORDER_LIST_REQUEST_ADD",
                "PARTSTORE_SUPPLIER_ADD"
            ],
            PART_MASTER:[
                "PARTSTORE_PART_MASTER_CATEGORY_VIEW_LIST",
                "PARTSTORE_PART_MASTER_ITEM_VIEW_LIST",
            ]
        };

        /* '''''Configuration''''' */
        this._configurationPermission = {
            USER_MANAGEMENT:[
                "USER_NORMAL_VIEW_LIST",
                "DROLE_VIEW_LIST",
                "USER_NORMAL_ADD",
                "DROLE_ADD",
            ],
            ASSET_POLICY:[
                "ASSET_POLICY_ASSET_VIEW_LIST",
                "ASSET_POLICY_SUB_ASSET_VIEW_LIST",
                "ASSET_POLICY_ASSET_ADD",
                "ASSET_POLICY_SUB_ASSET_ADD"
            ],
            FLEET_CONFIGURATION:[
                "FLEET_CONFIGURATION_VIEW_LIST",
            ],
            USAGE_CATEGORY:[
                "BUSINESS_CATEGORY_VIEW_LIST",
                "BUSINESS_CATEGORY_ADD",
            ],
            OWNERSHIP:[
                "OWNERSHIP_VIEW_LIST",
                "OWNERSHIP_ADD"
            ],
            PERIODIC_SERVICE:[
                "PERIODIC_SERVICE_VIEW_LIST",
                "PERIODIC_SERVICE_ADD"
            ]
        };

        /* '''''Integration''''' */
        this._integrationPermission = {
            INTEGRATION:[
                ''
            ]
        }
    }

    public checkPermissions(parent:string , permission:string ): string[]{
        switch (parent) {
            
            /* '''''Dashboard''''' */
            case "DASHBOARD":
                let permissionDashboardLabel = {
                    DASHBOARD:this._dashboardPermission.DASHBOARD,
                };
                return permissionDashboardLabel[permission];
            
            
            /* '''''Fleet''''' */
            case "FLEET":
                let permissionFleetLabel = {
                    ASSET:this._fleetPermission.ASSET,
                    SUB_ASSET:this._fleetPermission.SUB_ASSET,
                    ACCESSORY:this._fleetPermission.ACCESSORY,
                    OPERATOR:this._fleetPermission.OPERATOR,
                    DEPARTMENT:this._fleetPermission.DEPARTMENT,
                    MOVEMENT:this._fleetPermission.MOVEMENT
                };
                if(permission === "FLEET"){
                    let permissionFleet = {
                        FLEET:[]
                    }
                    Object.values(permissionFleetLabel).map(x => {
                        x.map( y =>{
                            permissionFleet.FLEET.push(y)
                        })
                    });
                    return permissionFleet[permission];
                }else{
                    return permissionFleetLabel[permission];
                };


            /* '''''Fuel Management''''' */
            case "FUEL_MANAGEMENT":
                let permissionFuelLabel = {
                    FUEL_MANAGEMENT:this._fuelManagementPermission.FUEL_MANAGEMENT,
                };
                console.log(permissionFuelLabel[permission])
                return permissionFuelLabel[permission];


            /* '''''Traffic Fines''''' */
            case "TRRAFIC_FINE":
                let permissionTrafficLabel = {
                    TRRAFIC_FINE:this._trafficFinesPermisssion.TRRAFIC_FINE,
                };
                return permissionTrafficLabel[permission];


            /* '''''Toll''''' */    
            case "TOLL":
                let permissionTollLabel = {
                    TOLL:this._tollPermission.TOLL,
                };
                return permissionTollLabel[permission];
            
            
            /* '''''Workshop''''' */
            case "WORKSHOP":
                let permissionWorkShopLabel = {
                    BODYSHOP:this._workshopPermission.BODYSHOP,
                    SERVICESHOP:this._workshopPermission.SERVICESHOP,
                    LOCATION:this._workshopPermission.LOCATION,
                    TASKMASTER:this._workshopPermission.TASKMASTER,
                };
                if(permission === "WORKSHOP"){
                    let permissionWorkshop = {
                        WORKSHOP:[]
                    }
                    Object.values(permissionWorkShopLabel).map(x => {
                        x.map( y =>{
                            permissionWorkshop.WORKSHOP.push(y)
                        })
                    });
                    return permissionWorkshop[permission];
                }else{
                    return permissionWorkShopLabel[permission];
                };


            /* '''''Part Store''''' */
            case "PART_STORE":
                let permissionPartStoreLabel = {
                    PART_LIST:this._partStorePermission.PART_LIST,
                    ORDER_LIST:this._partStorePermission.ORDER_LIST,
                    PART_MASTER:this._partStorePermission.PART_MASTER,
                };
                if(permission === "PART_STORE"){
                    let permissionPartStore = {
                        PART_STORE:[]
                    }
                    Object.values(permissionPartStoreLabel).map(x => {
                        x.map( y =>{
                            permissionPartStore.PART_STORE.push(y)
                        })
                    });
                    return permissionPartStore[permission];
                }else{
                    return permissionPartStoreLabel[permission];
                };

            
            /* '''''Configuration''''' */
            case "CONFIGURATION":
                let permissionPartConfigurationLabel = {
                    USER_MANAGEMENT:this._configurationPermission.USER_MANAGEMENT,
                    ASSET_POLICY:this._configurationPermission.ASSET_POLICY,
                    FLEET_CONFIGURATION:this._configurationPermission.FLEET_CONFIGURATION,
                    USAGE_CATEGORY:this._configurationPermission.USAGE_CATEGORY,
                    OWNERSHIP:this._configurationPermission.OWNERSHIP,
                    PERIODIC_SERVICE:this._configurationPermission.PERIODIC_SERVICE,
                };
                if(permission === "CONFIGURATION"){
                    let permissionConfiguration = {
                        CONFIGURATION:[]
                    }
                    Object.values(permissionPartConfigurationLabel).map(x => {
                        x.map( y =>{
                            permissionConfiguration.CONFIGURATION.push(y)
                        })
                    });
                    return permissionConfiguration[permission];
                }else{
                    return permissionPartConfigurationLabel[permission];
                };

            
            /* '''''Integration''''' */
            case "INTEGRATION":
                let permissionIntegration = {
                    INTEGRATION:this._integrationPermission.INTEGRATION,
                };
                return permissionIntegration[permission];
        
        }
    }
}

