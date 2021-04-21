import {Component,OnInit} from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssetConfigurationService } from '@feature/configuration/+state/asset-configuration';
import {BusinessCategoryService} from '@feature/configuration/+state/business-category'
import { IAssetType } from '@models/asset-type.model';
import { IBusinessCategory } from '@models/business-category.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'anms-add-role-and-permission',
  templateUrl: './add-role-and-permission.component.html',
  styleUrls: ['./add-role-and-permission.component.scss']
})
export class AddRoleAndPermissionComponent implements OnInit {
  closeIcon = 'assets/icons/times.svg';
  
  /* forms */
  /* Role Information Forms*/
  roleInfoFrom: FormGroup;
  /* Fleet Forms */
  fleetAssetForm:FormGroup;
  fleetSubAssetForm:FormGroup;
  fleetAccessoryForm:FormGroup;
  fleetOperatorForm:FormGroup;
  fleetMovementForm:FormGroup;
  fleetDepartmentForm:FormGroup;
  /* Fuel Management Form */
  fuelManagementForm:FormGroup;
  /* Traffic Fines Form */
  trafficFinesForm:FormGroup;
  /* Salik Form */
  salikForm:FormGroup;
  /* Part Store Form */
  partStorePartListForm:FormGroup;
  partStoreOrderListForm:FormGroup;
  partStoreSupplierForm:FormGroup;
  partStorePartMasterForm:FormGroup;
  /* Workshop Form */
  workshopBodyshopForm:FormGroup;
  workshopServiceshopForm:FormGroup;
  workshopTechnicalInspectionForm:FormGroup;
  workshopAuctionListForm:FormGroup;
  workshopTaskMasterForm:FormGroup;
  /* Configuration Form */
  configurationUserManagementForm:FormGroup;
  configurationAssetPolicyForm:FormGroup;
  configurationAssetConfigurationForm:FormGroup;
  configurationUsageCategoryForm:FormGroup;
  configurationOwnershipForm:FormGroup;
  configurationPeriodicServiceForm:FormGroup;
  existingRole:[
    {
      role:'Super Admin',
      id:1
    },
    {
      role:'Admin',
      id:2
    },
    {
      role:'Operator',
      id:3
    },
    {
      role:'Technician',
      id:4
    }
  ]
  /* AutoCompelete */
  assetTypeFiltered: any[] = [];
  assetType:IAssetType[]=[];
  usageCategoryFiltered:any[]=[];
  usageCategory:IBusinessCategory[]=[];
  

  /* fleet Asset */
  FlEET_VIEW_ASSET_ASSET_TYPE = [];
  FlEET_ADD_ASSET_ASSET_TYPE = [];
  FlEET_UPDATE_ASSET_ASSET_TYPE = [];
  FLEET_VIEW_ASSET_USAGE_CATEGORY = [];
  FLEET_ADD_ASSET_USAGE_CATEGORY = [];
  FLEET_UPDATE_ASSET_USAGE_CATEGORY = [];
  WORKSHOP_TECHNICAL_INSPECTION_VIEW_ASSET_TYPE =[];
  
  constructor(private translationService:TranslateService,
              private _assetConfigurationService:AssetConfigurationService,
              private _usageCategoryService: BusinessCategoryService,
              private _fb : FormBuilder){}

  middleCheckboxLabelArray = [
    { name: 'registration' },
    { name: 'customization' },
    { name: 'sub_asset' },
    { name: 'accessory' },
    { name: 'operator' },
    { name: 'organization' },
    { name: 'movement' }
  ];

  middleDropDownLabelArray = [
    { name: 'registration' },
    { name: 'customization' },
    { name: 'sub_asset' },
    { name: 'accessory' },
    { name: 'operator' },
    { name: 'organization' },
    { name: 'movement' }
  ];

  translations = {
    'configuration.role_permission.registration': '',
    'configuration.role_permission.customization': '',
    'configuration.role_permission.sub_asset': '',
    'configuration.role_permission.accessory': '',
    'configuration.role_permission.operator': '',
    'configuration.role_permission.organization': '',
    'configuration.role_permission.movement': ''
  };

  // getTranslations() {
  //   const translationLabels = Object.keys(this.translations);
  //   this.translationService.get(translationLabels).subscribe((translation) => {
  //     this.translations = translation;
  //     this.middleCheckboxLabelArray = [];
  //     Object.keys(translation).forEach((key) => {
  //       this.middleCheckboxLabelArray.push({ name: translation[key] });
  //     });
  //   });
  // }
  
  ngOnInit():void{
    this._assetConfigurationService.loadAll().subscribe(
      x => {this.assetType = x.message}
    );
    this._usageCategoryService.loadAll().subscribe(
      x => {this.usageCategory = x.message}
    );

    /* Form Builder Functions */
    this.roleInfoFrom = this._fb.group({
      roleName:['',Validators.required],
      desciption:['']
    })
    this.fleetAssetFormBuilder();
    this.fleetSubAssetFormBuilder();
    this.fleetAccessoryFormBuilder();
    this.fleetOperatorFormBuilder();
    this.fleetMovementFormBuilder();
    this.fleetDepartmentFormBuilder();
    this.fuelManagementFormBuilder();
    this.salikFormBuilder();
    this.partStorePartListFormBuilder();
    this.partStoreOrderListFormBuilder();
    this.partStoreSupplierFormBuilder();
    this.workshopBodyshopFormBuilder();
    this.workshopServiceshopFormBuilder();
    this.workshopTechnicalInspectionFormBuilder();
    this.workshopAuctionListFormBuilder();
    this.workshopTaskMasterFormBuilder();
    this.configurationUserManagementFormBuilder();
    this.configurationAssetPolicyFormBuilder();
    this.configurationAssetConfigurationFormBuilder();
    this.configurationUsageCategoryFormBuilder();
    this.configurationOwnershipFormBuilder();
    this.configurationPeriodicServiceFormBuilder();
  }
  

  /* AutoCompelete functions */
  getFilteredAssetType(event) {
    let query = event.query;
    let filtered = [];
    for (let index = 0; index < this.assetType.length; index++) {
      let assetType = this.assetType[index];
      if (assetType.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(assetType);
      }
    }
    this.assetTypeFiltered = filtered;
  }
  getFilteredUsageCategory(event) {
    let query = event.query;
    let filtered = [];
    for (let index = 0; index < this.usageCategory.length; index++) {
      let usageCategory = this.usageCategory[index];
      if (usageCategory.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(usageCategory);
      }
    }
    this.usageCategoryFiltered = filtered;
  }
  addToList(name:string,event){
   switch (name) {
      case 'FlEET_VIEW_ASSET_ASSET_TYPE':
        this.FlEET_VIEW_ASSET_ASSET_TYPE.push(event)
        break;
      case 'FlEET_ADD_ASSET_ASSET_TYPE':
        this.FlEET_ADD_ASSET_ASSET_TYPE.push(event)
        break;
      case 'FlEET_UPDATE_ASSET_ASSET_TYPE':
        this.FlEET_UPDATE_ASSET_ASSET_TYPE.push(event)
        break;
      case 'FLEET_VIEW_ASSET_USAGE_CATEGORY':
        this.FLEET_VIEW_ASSET_USAGE_CATEGORY.push(event)
        break;
      case 'FLEET_ADD_ASSET_USAGE_CATEGORY':
        this.FLEET_ADD_ASSET_USAGE_CATEGORY.push(event)
        break;
      case 'FLEET_UPDATE_ASSET_USAGE_CATEGORY':
        this.FLEET_UPDATE_ASSET_USAGE_CATEGORY.push(event)
        break;
      case 'WORKSHOP_TECHNICAL_INSPECTION_VIEW_ASSET_TYPE':
        this.WORKSHOP_TECHNICAL_INSPECTION_VIEW_ASSET_TYPE.push(event)
        break;
      default:
        break;
    }
    
  }
  removelist(name:string , index:number){
    switch (name) {
      case 'FlEET_VIEW_ASSET_ASSET_TYPE':
        this.FlEET_VIEW_ASSET_ASSET_TYPE.splice(index,1)
        break;
      case 'FlEET_ADD_ASSET_ASSET_TYPE':
        this.FlEET_ADD_ASSET_ASSET_TYPE.splice(index,1)
        break;
      case 'FlEET_UPDATE_ASSET_ASSET_TYPE':
        this.FlEET_UPDATE_ASSET_ASSET_TYPE.splice(index,1)
        break;
      case 'FLEET_VIEW_ASSET_USAGE_CATEGORY':
        this.FLEET_VIEW_ASSET_USAGE_CATEGORY.splice(index,1)
        break;
      case 'FLEET_ADD_ASSET_USAGE_CATEGORY':
        this.FLEET_ADD_ASSET_USAGE_CATEGORY.splice(index,1)
        break;
      case 'FLEET_UPDATE_ASSET_USAGE_CATEGORY':
        this.FLEET_UPDATE_ASSET_USAGE_CATEGORY.splice(index,1)
        break;
      case 'WORKSHOP_TECHNICAL_INSPECTION_VIEW_ASSET_TYPE':
        this.WORKSHOP_TECHNICAL_INSPECTION_VIEW_ASSET_TYPE.splice(index,1)
        break;
      default:
        break;
    }
  }
  fleetAssetFormBuilder(){
    this.fleetAssetForm = this._fb.group({
      archiveAsset:[false],
      archiveOwnAsset:[false],
      exportAssetList:[false],
      viewOwnAsset:[false],
      viewAssetmaster:[false],
      addAsset:[false],
      updateAssetMaster:[false],
      updateEditOwnAsset:[false],
      viewPendingRegistrationList:[false],
      viewOwnPendingRegistrationList:[false],
      updateEditOwnRegistrationList:[false],
      viewPendingCustomizationList:[false],
      viewOwnPendingCustomizationList:[false],
      updateEditCustomizationList:[false],
      customizeAsset:[false],
      assetViewDetailOverview:[false],
      assetMovementHistory:[false],
      assetUsageCategory:[false],
      assetReminderList:[false],
      addReminder:[false],
      viewAssetConfiguration:[false],
      addAssetConfiguration:[false],
      updateAssetConfiguration:[false],
      viewUsageCategory:[false],
      addUsageCategory:[false],
      updateUsageCategory:[false]
    })
  }
  fleetSubAssetFormBuilder(){
    this.fleetSubAssetForm = this._fb.group({
      viewSubAssetList:[false],
      viewOwnSubAssetList:[false],
      exportSubAssetList:[false],
      archiveSubAsset:[false],
      viewSubAssetDetail:[false],
      editSubAsset:[false],
      updateEditOwnSubAsset:[false],
      addSubAsset:[false]
    })
  };
  fleetAccessoryFormBuilder(){
    this.fleetAccessoryForm = this._fb.group({
      viewAccesssoryList:[false],
      viewOwnAccessorylist:[false],
      archiveAccessory:[false],
      viewAccessoryDetail:[false],
      updateEditOwnAccessory:[false],
      editAccessory:[false],
      exportAccessoryDetail:[false],
      addAccessory:[false]
    })
  };
  fleetOperatorFormBuilder(){
    this.fleetOperatorForm = this._fb.group({
      viewOperatorList:[false],
      exportOperatorList:[false],
      updateEditOperator:[false],
      addOperator:[false],
      viewOwnList:[false],
      viewOwnTrafficFine:[false],
      viewOwnMovementHistory:[false],
      viewOwnActivity:[false],
      viewOperatorDetails:[false],
      viewOperatorTrafficFine:[false],
      viewOperatorMovementHistory:[false],
      viewOperatorActivity:[false]
    })
  };
  fleetMovementFormBuilder(){
    this.fleetMovementForm = this._fb.group({
      viewMovementListOverview:[false],
      viewMovementRequestList:[false],
      exportMovementList:[false],
      approveRequest:[false],
      updateEditMovement:[false],
      addRequest:[false],
      viewOwnMovementListOverview:[false],
      viewOwnMovementRequestList:[false],
      exportOwnMovementList:[false],
      approveOwnRequest:[false],
      updateEditOwnMovement:[false]
    })
  };
  fleetDepartmentFormBuilder(){
    this.fleetDepartmentForm = this._fb.group({
      viewDepartmentList:[false],
      exportDepartmentList:[false],
      updateEditDepartment:[false],
      addDepartment:[false],
      viewDepartmentDetailOverview:[false],
      viewDepartmentUsers:[false],
      viewDepartmentTrafficFines:[false],
      viewDepartmentMovementHistory:[false]
    })
  };
  fuelManagementFormBuilder(){
    this.fuelManagementForm = this._fb.group({
      viewFuelCardsList:[false],
      viewAssetUsageList:[false],
      updateEditFuelCard:[false],
      exportFuelCard:[false],
      addFuelCard:[false],
      viewFuelCardDetail:[false],
      viewOwnFuelCardsList:[false],
      viewOwnAssetUsageList:[false],
    })
  };
  salikFormBuilder(){
    this.salikForm = this._fb.group({
      viewListOfSalik:[false],
      addSalik:[false],
      uploadFile:[false],
      assignSalik:[false],
    })
  };
  partStorePartListFormBuilder(){
    this.partStorePartListForm = this._fb.group({
      viewPartList:[false],
      exportPartList:[false],
      viewPartdetail:[false],
      orderPart:[false],
      updateEditPart:[false],
    })
  };
  partStoreOrderListFormBuilder(){
    this.partStoreOrderListForm = this._fb.group({
      viewRequestList:[false],
      exporRequestList:[false],
      approveRequest:[false],
      viewMyOrderList:[false],
      exportMyOrderList:[false],
      addOrder:[false],
    })
  };
  partStoreSupplierFormBuilder(){
    this.partStoreSupplierForm = this._fb.group({
      viewSupplierList:[false],
      exportSupplierList:[false],
      addSupplier:[false],
    })
  };
  workshopBodyshopFormBuilder(){
    this.workshopBodyshopForm = this._fb.group({
      viewRequestList:[false],
      exportRequestList:[false],
      addRequest:[false],
      updateEditOwnRequest:[false],
      viewOwnRequest:[false],
      viewRequestDetail:[false],
      rejectRequest:[false],
      archiveOwnRequest:[false],
      viewLocationList:[false],
      exportLocationList:[false],
      addLocation:[false],
      updateEditLocation:[false],
      archiveLocation:[false],
      viewTechnicianList:[false],
      exportTechnicianList:[false],
      AddTechnician:[false],
      viewTechnicianDetailOverview:[false],
      viewOwnTechnicianDetailOverview:[false],
      updateEditTechnicianInformation:[false],
      updateEditOwnTechnicianInformation:[false],
      viewTechnicianJobCardsList:[false],
      exportTechnicianJobCardsList:[false],
      viewOwnTechnicianActivity:[false],
      viewTechnicianActivity:[false],
      archiveTechnician:[false],
      viewJobCardList:[false],
      exportJobCardList:[false],
      addJobCard:[false],
      viewAssetRequest:[false],
      viewAssetList:[false],
      viewAddTask:[false],
      viewTaskDetail:[false],
      UpdateEditOwnJobCard:[false],
      viewOwnJobCard:[false],
      closeJobCard:[false],
    })
  };
  workshopServiceshopFormBuilder(){
    this.workshopServiceshopForm = this._fb.group({
      viewRequestList:[false],
      exportRequestList:[false],
      addRequest:[false],
      updateEditOwnRequest:[false],
      viewOwnRequest:[false],
      viewRequestDetail:[false],
      rejectRequest:[false],
      archiveOwnRequest:[false],
      viewLocationList:[false],
      exportLocationList:[false],
      addLocation:[false],
      updateEditLocation:[false],
      archiveLocation:[false],
      viewTechnicianList:[false],
      exportTechnicianList:[false],
      AddTechnician:[false],
      viewTechnicianDetailOverview:[false],
      viewOwnTechnicianDetailOverview:[false],
      updateEditTechnicianInformation:[false],
      updateEditOwnTechnicianInformation:[false],
      viewTechnicianJobCardsList:[false],
      exportTechnicianJobCardsList:[false],
      viewOwnTechnicianActivity:[false],
      viewTechnicianActivity:[false],
      archiveTechnician:[false],
      viewJobCardList:[false],
      exportJobCardList:[false],
      addJobCard:[false],
      viewAssetRequest:[false],
      viewAssetList:[false],
      viewAddTask:[false],
      viewTaskDetail:[false],
      UpdateEditOwnJobCard:[false],
      viewOwnJobCard:[false],
      closeJobCard:[false],
    })
  };

  workshopTechnicalInspectionFormBuilder(){
    this.workshopTechnicalInspectionForm = this._fb.group({
      viewTechnicalInspectionRequestList:[false],
      exportTechnicalInspectionRequestList:[false],
      addTechnicalInspection:[false],
      approveTechnicalInspectionRequest:[false],
      viewTechnicalInspectionRequestDetail:[false],
      addDecision:[false],
      viewAllDecision:[false],
      updateEditOwnDecision:[false],
      finalDecision:[false],
      viewAssetType:[false],
    })
  };

  workshopAuctionListFormBuilder(){
    this.workshopAuctionListForm = this._fb.group({
      viewAuctionList:[false],
      viewSoldList:[false],
      exportAuctionList:[false],
      exportSoldList:[false],
      viewItemDetail:[false],
      updateItemDetail:[false]
    })
  }
  workshopTaskMasterFormBuilder(){
    this.workshopTaskMasterForm = this._fb.group({
      viewTaskList:[false],
      exportTaskList:[false],
      addTask:[false],
      updateEdittask:[false],
      archiveTask:[false]
    })
  };
  configurationUserManagementFormBuilder(){
    this.configurationUserManagementForm = this._fb.group({
      viewRoleList:[false],
      addRole:[false],
      updateRole:[false],
      viewUserList:[false],
      addUser:[false],
      updateUser:[false]
    })
  };
  configurationAssetPolicyFormBuilder(){
    this.configurationAssetPolicyForm = this._fb.group({
      viewAssetPolicyList:[false],
      viewSubAssetPolicyList:[false],
      updateAssetPolicy:[false],
      updateSubAssetPolicy:[false],
      addAssetSubAssetPolicy:[false],
    })
  };
  configurationAssetConfigurationFormBuilder(){
    this.configurationAssetConfigurationForm = this._fb.group({
      addAssetConfiguration:[false],
      viewAssetConfigurationList:[false],
      updateAssetConfiguration:[false],
    })
  };
  configurationUsageCategoryFormBuilder(){
    this.configurationUsageCategoryForm = this._fb.group({
      viewUsageCategoryList:[false],
      updateUsageCategory:[false],
      addusageCategory:[false],
    })
  };
  configurationOwnershipFormBuilder(){
    this.configurationOwnershipForm = this._fb.group({
      addOwnerShipList:[false],
      updateOwnership:[false],
      viewOwnershipList:[false]
    })
  };
  configurationPeriodicServiceFormBuilder(){
    this.configurationPeriodicServiceForm = this._fb.group({
      viewPeriodicServiceList:[false],
      editPeriodicService:[false],
      addPeriodicServie:[false],
    })
  }

}
