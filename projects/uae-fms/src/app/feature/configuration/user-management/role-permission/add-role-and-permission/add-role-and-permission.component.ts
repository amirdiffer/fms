import {Component,ElementRef,Injector,Input,OnInit, ViewChild} from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { AssetConfigurationService } from '@feature/configuration/+state/asset-configuration';
import {BusinessCategoryService} from '@feature/configuration/+state/business-category'
import { RolePermissionFacade } from '@feature/configuration/+state/role-permission';
import { IAssetType } from '@models/asset-type.model';
import { IBusinessCategory } from '@models/business-category.model';
import { Utility } from '@shared/utility/utility';
import { map } from 'rxjs/operators';

@Component({
  selector: 'anms-add-role-and-permission',
  templateUrl: './add-role-and-permission.component.html',
  styleUrls: ['./add-role-and-permission.component.scss']
})
export class AddRoleAndPermissionComponent extends Utility  implements OnInit {
  closeIcon = 'assets/icons/times.svg';
  submitted:boolean = false;
  isEdit:boolean= false;
  IsOverview:boolean=false;
  roleId;
  specificRole=[];
  roleOverView;
  @ViewChild('roleAndPermision',{static:true}) roleAndPermision:ElementRef
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
  

  /* Alert Dialog */
  dialogModal = false;
  errorDialogModal = false;
  dialogOption = null;
  dialogSetting: IDialogAlert = {
    header: 'Add New Role',
    hasError: false,
    message: 'Message is Here',
    confirmButton: 'Add',
    cancelButton: 'Cancel'
  };

  errorDialogSetting: IDialogAlert = {
    header: '',
    message: 'Error occurred in progress',
    confirmButton: 'Ok',
    isWarning: false,
    hasError: true,
    hasHeader: true,
    cancelButton: undefined
  };
  constructor(private _assetConfigurationService:AssetConfigurationService,
              private _usageCategoryService: BusinessCategoryService,
              private _roleFacade : RolePermissionFacade,
              private _router :Router,
              private _fb : FormBuilder,
              private _activatedRoute:ActivatedRoute,
              injector: Injector){super(injector);}



  roleData$ = this._roleFacade.rolePermission$.pipe(
    map(
      x => {
        return x.map(y =>{
          return {...y}
        })
      }
    )
  )

  
  ngOnInit():void{
    this.formBuilders();
    this._roleFacade.submitted$.subscribe((x) => {
      if (x) {
        this.dialogModal = true;
        this.dialogOption = 'success';
        this.dialogSetting.header = this.isEdit
          ? 'Edit Role'
          : 'Add new Role';
        this.dialogSetting.message = this.isEdit
          ? 'Changes Saved Successfully'
          : 'Role Added Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'OK';
        this.dialogSetting.cancelButton = undefined;
      }
    });
    this._roleFacade.error$.subscribe((x) => {
      if (x?.error) {
        this.errorDialogModal = true;
        this.errorDialogSetting.header = this.isEdit
          ? 'Edit Sub Asset'
          : 'Add new Sub Asset';
        this.errorDialogSetting.hasError = true;
        this.errorDialogSetting.cancelButton = undefined;
        this.errorDialogSetting.confirmButton = 'Ok';
      } else {
        this.errorDialogModal = false;
      }
    });
    const url = this._activatedRoute.snapshot.url.filter(x => x.path == 'edit-role-permission')
    const urlOverview = this._activatedRoute.snapshot.url.filter(x => x.path == 'role-permission')
    const chackHasId = +this._activatedRoute.snapshot.url[this._activatedRoute.snapshot.url.length -1].path
    if(urlOverview.length > 0 && !isNaN(chackHasId)){
      this.IsOverview = true;
    }
    if(url.length > 0 || this.IsOverview){
      this.isEdit = true;
      this.roleId = +this._activatedRoute.snapshot.url[this._activatedRoute.snapshot.url.length -1].path
      this._roleFacade.getRoleByRoleID(this.roleId)
      this._roleFacade.specificRole$.subscribe(
        role => {
          if(role){
            this.specificRole = role.permissions;
            this.roleOverView= role
            if(this.roleInfoFrom){
              this.roleInfoFrom.patchValue({
                roleName:role.roleName
              })
            }
            this.patchValueEditForm();

          }
        }

      )
    }
    this._roleFacade.loadAll();
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
  };
  dialog(event) {
    if(this.dialogOption == 'cancel' && event){
      this._router.navigate(['configuration/user-management/role-permission'])
    }
    if(this.dialogOption == 'submit' && event){
      const formData = {
        name:this.roleInfoFrom.get('roleName').value,
        permissions:this.getTrueValue()
      };
      if(this.isEdit){
        this._roleFacade.updateRole({id:this.roleId,name:formData.name,permissions:formData.permissions})
      }else{
        this._roleFacade.addNewRoll(formData)
      }
    }
    if(this.dialogOption == 'success' && event){
      this._roleFacade.reset();
      this._router.navigate(['configuration/user-management/role-permission'])
    }
    this.dialogModal = false;
  }
  cancelForm(){
    this.dialogOption = 'cancel'
    this.dialogSetting = {
      header: 'Add New Role',
      hasError: false,
      isWarning:true,
      message: 'Do you want to cancel ? if you accept your data will be lost',
      confirmButton: 'Yes',
      cancelButton: 'No'
    };
    this.dialogModal = true;
  }
  submitForm(){
    this.submitted = true;
    this.roleInfoFrom.markAllAsTouched();
    if (this.roleInfoFrom.invalid) return;
    if(this.getTrueValue().length == 0){
      this.dialogOption = 'error'
      this.dialogSetting = {
        header: 'Add New Role',
        hasError: true,
        isWarning:true,
        message: 'Please choose at least one permission for this role',
        confirmButton: 'Ok',
        cancelButton: null
      };
      this.dialogModal = true;
    }else{
      this.dialogOption = 'submit'
      this.dialogSetting = {
        header: 'Add New Role',
        hasError: false,
        isWarning:true,
        message: 'Are you sure you want to add new role ?',
        confirmButton: 'Yes',
        cancelButton: 'No'
      };
      this.dialogModal = true;
    }
  
  }

  selectAndClearAll(formName:string , option:string = 'clear'){
    switch (formName) {
      case 'FLEET_ASSET':
        this.selectAlForm(this.fleetAssetForm , option)
        break;
      case 'FLEET_SUB_ASSET':
        this.selectAlForm(this.fleetSubAssetForm , option)
        break;
      case 'FLEET_ACCESSORY':
        this.selectAlForm(this.fleetAccessoryForm, option)
        break;
      case 'FLEET_OPERATOR':
        this.selectAlForm(this.fleetOperatorForm, option)
        break;
      case 'FLEET_MOVEMENT':
        this.selectAlForm(this.fleetMovementForm, option)
        break;
      case 'FLEET_DEPARTMENT':
        this.selectAlForm(this.fleetDepartmentForm, option)
        break;
      case 'FLEET_FUEL_MANAGEMENT':
        this.selectAlForm(this.fuelManagementForm, option)
        break;
      case 'TRAFFIC_FINES':
        // this.selectAlForm(this.trafficFinesForm, option)
        break;
      case 'SALIK':
        this.selectAlForm(this.salikForm, option)
        break;
      case 'PART_STORE_PART_LIST':
        this.selectAlForm(this.partStorePartListForm, option)
        break;
      case 'PART_STORE_ORDER_LIST':
        this.selectAlForm(this.partStoreOrderListForm, option)
        break;
      case 'PART_STORE_SUPPLIER':
        this.selectAlForm(this.partStoreSupplierForm, option)
        break;
      case 'PART_STORE_PART_MASTER':
        // this.selectAlForm(this.partStorePartMasterForm, option)
        break;
      case 'WORKSHOP_BODY_SHOP':
        this.selectAlForm(this.workshopBodyshopForm, option)
        break;
      case 'WORKSHOP_SERVICE_SHOP':
        this.selectAlForm(this.workshopServiceshopForm, option)
        break;
      case 'WORKSHOP_TECHNICAL':
        this.selectAlForm(this.workshopTechnicalInspectionForm, option)
        break;
      case 'WORKSHOP_AUCTION_LIST':
        this.selectAlForm(this.workshopAuctionListForm, option)
        break;
      case 'WORKSHOP_TASK_MASTER':
        this.selectAlForm(this.workshopTaskMasterForm, option)
        break;
      case 'CONFIGURATION_USER':
        this.selectAlForm(this.configurationUserManagementForm, option)
        break;
      case 'CONFIGURATION_ASSET_POLICY':
        this.selectAlForm(this.configurationAssetPolicyForm, option)
        break;
      case 'CONFIGURATION_ASSET_TYPE':
        this.selectAlForm(this.configurationAssetConfigurationForm, option)
        break;
      case 'CONFIGURATION_USAGE_CATEGORY':
        this.selectAlForm(this.configurationUsageCategoryForm, option)
        break;
      case 'CONFIGURATION_OWNERSHIP':
        this.selectAlForm(this.configurationOwnershipForm, option)
        break;
      case 'CONFIGURATION_PERIODIC_SERVICE':
        this.selectAlForm(this.configurationPeriodicServiceForm, option)
        break;
      default:
        break;
    }
  }
  fleetAssetFormBuilder(){
    this.fleetAssetForm = this._fb.group({
      ASSET_ARCHIVE_OTHERS:[false],
      ASSET_ARCHIVE_OWN:[false],
      ASSET_EXPORT_LIST_MASTER:[false],
      ASSET_VIEW_LIST_MASTER_OWN:[false],
      ASSET_VIEW_LIST_MASTER_OTHERS:[false],
      ASSET_ADD:[false],
      ASSET_UPDATE_OTHERS:[false],
      ASSET_UPDATE_OWN:[false],
      ASSET_VIEW_LIST_PENDING_OTHERS:[false],
      ASSET_VIEW_LIST_PENDING_OWN:[false],
      updateEditOwnRegistrationList:[{value:false ,  disabled: true}],
      ASSET_VIEW_LIST_CUSTOMIZATION_OTHERS:[false],
      ASSET_VIEW_LIST_CUSTOMIZATION_OWN:[false],
      updateEditCustomizationList:[{value:false ,  disabled: true}],
      ASSET_CUSTOMIZE_OTHERS:[false],
      ASSET_VIEW_DETAILS_OTHERS:[false],
      ASSET_VIEW_MOVEMENT_HISTORY_OTHERS:[false],
      assetUsageCategory:[{value:false ,  disabled: true}],
      assetReminderList:[{value:false ,  disabled: true}],
      addReminder:[{value:false ,  disabled: true}],
      viewAssetConfiguration:[{value:false ,  disabled: true}],
      addAssetConfiguration:[{value:false ,  disabled: true}],
      updateAssetConfiguration:[{value:false ,  disabled: true}],
      BUSINESS_CATEGORY_VIEW_LIST:[false],
      BUSINESS_CATEGORY_ADD:[false],
      BUSINESS_CATEGORY_UPDATE:[false]
    })
  }
  fleetSubAssetFormBuilder(){
    this.fleetSubAssetForm = this._fb.group({
      SUB_ASSET_VIEW_LIST_OTHERS:[false],
      SUB_ASSET_VIEW_LIST_OWN:[false],
      SUB_ASSET_EXPORT_LIST:[false],
      archiveSubAsset:[{value:false ,  disabled: true}],
      SUB_ASSET_VIEW_DETAILS_OTHERS:[false],
      SUB_ASSET_UPDATE_OTHERS:[false],
      SUB_ASSET_UPDATE_OWN:[false],
      SUB_ASSET_ADD:[false]
    })
  };
  fleetAccessoryFormBuilder(){
    this.fleetAccessoryForm = this._fb.group({
      ACCESSORY_VIEW_LIST_OTHERS:[false],
      ACCESSORY_VIEW_LIST_OWN:[false],
      archiveAccessory:[{value:false ,  disabled: true}],
      ACCESSORY_VIEW_DETAILS_OTHERS:[false],
      ACCESSORY_UPDATE_OWN:[false],
      ACCESSORY_UPDATE_OTHERS:[false],
      ACCESSORY_EXPORT_LIST:[false],
      ACCESSORY_ADD:[false]
    })
  };
  fleetOperatorFormBuilder(){
    this.fleetOperatorForm = this._fb.group({
      USER_OPERATOR_VIEW_LIST:[false],
      USER_OPERATOR_EXPORT_LIST:[false],
      USER_OPERATOR_UPDATE:[false],
      USER_OPERATOR_ADD:[false],
      viewOwnList:[{value:false ,  disabled: true}],
      viewOwnTrafficFine:[{value:false ,  disabled: true}],
      viewOwnMovementHistory:[{value:false ,  disabled: true}],
      viewOwnActivity:[{value:false ,  disabled: true}],
      USER_OPERATOR_VIEW_DETAILS_GENERAL:[false],
      USER_OPERATOR_VIEW_DETAILS_TRAFFIC_FINE:[false],
      USER_OPERATOR_VIEW_DETAILS_MOVEMENT_HISTORY:[false],
      viewOperatorActivity:[{value:false ,  disabled: true}],
    })
  };
  fleetMovementFormBuilder(){
    this.fleetMovementForm = this._fb.group({
      viewMovementListOverview:[{value:false ,  disabled: true}],
      MOVEMENT_REQUEST_VIEW_LIST_OTHERS:[false],
      MOVEMENT_REQUEST_EXPORT_LIST:[false],
      approveRequest:[{value:false ,  disabled: true}],
      MOVEMENT_REQUEST_UPDATE_OTHERS:[false],
      addRequest:[{value:false ,  disabled: true}],
      viewOwnMovementListOverview:[{value:false ,  disabled: true}],
      viewOwnMovementRequestList:[{value:false ,  disabled: true}],
      exportOwnMovementList:[{value:false ,  disabled: true}],
      approveOwnRequest:[{value:false ,  disabled: true}],
      MOVEMENT_REQUEST_UPDATE_OWN:[false]
    })
  };
  fleetDepartmentFormBuilder(){
    this.fleetDepartmentForm = this._fb.group({
      ORGANIZATION_VIEW_LIST:[false],
      ORGANIZATION_EXPORT_LIST:[false],
      ORGANIZATION_UPDATE:[false],
      ORGANIZATION_ADD:[false],
      ORGANIZATION_VIEW_DETAILS:[false],
      ORGANIZATION_VIEW_USERS:[false],
      ORGANIZATION_VIEW_TRAFFIC_FINES:[false],
      ORGANIZATION_VIEW_MOVEMENT_HISTORY:[false]
    })
  };
  fuelManagementFormBuilder(){
    this.fuelManagementForm = this._fb.group({
      FUEL_CARD_VIEW_LIST:[false],
      FUEL_CARD_VIEW_LIST_ASSET_USAGE:[false],
      FUEL_CARD_UPDATE:[false],
      FUEL_CARD_EXPORT_LIST:[false],
      FUEL_CARD_ADD:[false],
      FUEL_CARD_VIEW_DETAILS:[false],
      viewOwnFuelCardsList:[{value:false ,  disabled: true}],
      viewOwnAssetUsageList:[{value:false ,  disabled: true}],
    })
  };
  salikFormBuilder(){
    this.salikForm = this._fb.group({
      viewListOfSalik:[{value:false ,  disabled: true}],
      addSalik:[{value:false ,  disabled: true}],
      uploadFile:[{value:false ,  disabled: true}],
      assignSalik:[{value:false ,  disabled: true}],
    })
  };
  partStorePartListFormBuilder(){
    this.partStorePartListForm = this._fb.group({
      viewPartList:[{value:false ,  disabled: true}],
      exportPartList:[{value:false ,  disabled: true}],
      viewPartdetail:[{value:false ,  disabled: true}],
      orderPart:[{value:false ,  disabled: true}],
      updateEditPart:[{value:false ,  disabled: true}],
    })
  };
  partStoreOrderListFormBuilder(){
    this.partStoreOrderListForm = this._fb.group({
      viewRequestList:[{value:false ,  disabled: true}],
      exporRequestList:[{value:false ,  disabled: true}],
      approveRequest:[{value:false ,  disabled: true}],
      viewMyOrderList:[{value:false ,  disabled: true}],
      exportMyOrderList:[{value:false ,  disabled: true}],
      addOrder:[{value:false ,  disabled: true}],
    })
  };
  partStoreSupplierFormBuilder(){
    this.partStoreSupplierForm = this._fb.group({
      viewSupplierList:[{value:false ,  disabled: true}],
      exportSupplierList:[{value:false ,  disabled: true}],
      addSupplier:[{value:false ,  disabled: true}],
    })
  };
  workshopBodyshopFormBuilder(){
    this.workshopBodyshopForm = this._fb.group({
      WORKSHOP_BODY_SHOP_REQUEST_VIEW_LIST_OTHERS:[false],
      WORKSHOP_BODY_SHOP_REQUEST_EXPORT_LIST:[false],
      WORKSHOP_BODY_SHOP_REQUEST_ADD:[false],
      WORKSHOP_BODY_SHOP_REQUEST_UPDATE_OWN:[false],
      WORKSHOP_BODY_SHOP_REQUEST_VIEW_LIST_OWN:[false],
      WORKSHOP_BODY_SHOP_REQUEST_VIEW_DETAILS_OTHERS:[false],
      WORKSHOP_BODY_SHOP_REQUEST_REJECT:[false],
      archiveOwnRequest:[{value:false ,  disabled: true}],
      WORKSHOP_BODY_SHOP_LOCATION_VIEW_LIST:[false],
      WORKSHOP_BODY_SHOP_LOCATION_EXPORT_LIST:[false],
      WORKSHOP_BODY_SHOP_LOCATION_ADD:[false],
      WORKSHOP_BODY_SHOP_LOCATION_UPDATE:[false],
      archiveLocation:[{value:false ,  disabled: true}],
      WORKSHOP_BODY_SHOP_TECHNICIAN_VIEW_LIST:[false],
      WORKSHOP_BODY_SHOP_TECHNICIAN_EXPORT_LIST:[false],
      WORKSHOP_BODY_SHOP_TECHNICIAN_ADD:[false],
      WORKSHOP_BODY_SHOP_TECHNICIAN_VIEW_DETAILS:[false],
      viewOwnTechnicianDetailOverview:[false],
      WORKSHOP_BODY_SHOP_TECHNICIAN_UPDATE:[false],
      updateEditOwnTechnicianInformation:[{value:false ,  disabled: true}],
      viewTechnicianJobCardsList:[{value:false ,  disabled: true}],
      exportTechnicianJobCardsList:[{value:false ,  disabled: true}],
      viewOwnTechnicianActivity:[{value:false ,  disabled: true}],
      viewTechnicianActivity:[{value:false ,  disabled: true}],
      archiveTechnician:[{value:false ,  disabled: true}],
      WORKSHOP_BODY_SHOP_JOB_CARD_VIEW_LIST:[false],
      WORKSHOP_BODY_SHOP_JOB_CARD_EXPORT_LIST:[false],
      addJobCard:[{value:false ,  disabled: true}],
      WORKSHOP_BODY_SHOP_ASSET_REQUEST_VIEW_LIST_OTHERS:[false],
      viewAssetList:[{value:false ,  disabled: true}],
      viewAddTask:[{value:false ,  disabled: true}],
      viewTaskDetail:[{value:false ,  disabled: true}],
      UpdateEditOwnJobCard:[false],
      viewOwnJobCard:[{value:false ,  disabled: true}],
      WORKSHOP_BODY_SHOP_JOB_CARD_OPEN_CLOSE:[false],
    })
  };
  workshopServiceshopFormBuilder(){
    this.workshopServiceshopForm = this._fb.group({
      WORKSHOP_SERVICE_SHOP_REQUEST_OF_ASSET_VIEW_LIST_OTHERS:[false],
      WORKSHOP_SERVICE_SHOP_REQUEST_EXPORT_LIST:[false],
      WORKSHOP_SERVICE_SHOP_REQUEST_ADD:[false],
      WORKSHOP_SERVICE_SHOP_REQUEST_UPDATE_OWN:[false],
      WORKSHOP_SERVICE_SHOP_REQUEST_OF_ASSET_VIEW_LIST_OWN:[false],
      WORKSHOP_SERVICE_SHOP_REQUEST_VIEW_DETAILS_OTHERS:[false],
      WORKSHOP_SERVICE_SHOP_REQUEST_REJECT:[false],
      archiveOwnRequest:[{value:false ,  disabled: true}],
      WORKSHOP_SERVICE_SHOP_LOCATION_VIEW_LIST:[false],
      WORKSHOP_SERVICE_SHOP_LOCATION_EXPORT_LIST:[false],
      WORKSHOP_SERVICE_SHOP_LOCATION_ADD:[false],
      WORKSHOP_SERVICE_SHOP_LOCATION_UPDATE:[false],
      archiveLocation:[{value:false ,  disabled: true}],
      WORKSHOP_SERVICE_SHOP_TECHNICIAN_VIEW_LIST:[false],
      WORKSHOP_SERVICE_SHOP_TECHNICIAN_EXPORT_LIST:[false],
      WORKSHOP_SERVICE_SHOP_TECHNICIAN_ADD:[false],
      WORKSHOP_SERVICE_SHOP_TECHNICIAN_VIEW_DETAILS:[false],
      viewOwnTechnicianDetailOverview:[{value:false ,  disabled: true}],
      updateEditTechnicianInformation:[{value:false ,  disabled: true}],
      updateEditOwnTechnicianInformation:[{value:false ,  disabled: true}],
      viewTechnicianJobCardsList:[{value:false ,  disabled: true}],
      exportTechnicianJobCardsList:[{value:false ,  disabled: true}],
      viewOwnTechnicianActivity:[{value:false ,  disabled: true}],
      viewTechnicianActivity:[{value:false ,  disabled: true}],
      archiveTechnician:[{value:false ,  disabled: true}],
      WORKSHOP_SERVICE_SHOP_JOB_CARD_VIEW_LIST:[false],
      WORKSHOP_SERVICE_SHOP_JOB_CARD_EXPORT_LIST:[false],
      addJobCard:[{value:false ,  disabled: true}],
      WORKSHOP_SERVICE_SHOP_ASSET_REQUEST_VIEW_LIST_OTHERS:[false],
      viewAssetList:[{value:false ,  disabled: true}],
      viewAddTask:[{value:false ,  disabled: true}],
      viewTaskDetail:[{value:false ,  disabled: true}],
      UpdateEditOwnJobCard:[{value:false ,  disabled: true}],
      viewOwnJobCard:[{value:false ,  disabled: true}],
      WORKSHOP_SERVICE_SHOP_JOB_CARD_OPEN_CLOSE:[false],
    })
  };

  workshopTechnicalInspectionFormBuilder(){
    this.workshopTechnicalInspectionForm = this._fb.group({
      viewTechnicalInspectionRequestList:[{value:false ,  disabled: true}],
      exportTechnicalInspectionRequestList:[{value:false ,  disabled: true}],
      addTechnicalInspection:[{value:false ,  disabled: true}],
      approveTechnicalInspectionRequest:[{value:false ,  disabled: true}],
      viewTechnicalInspectionRequestDetail:[{value:false ,  disabled: true}],
      addDecision:[{value:false ,  disabled: true}],
      viewAllDecision:[{value:false ,  disabled: true}],
      updateEditOwnDecision:[{value:false ,  disabled: true}],
      finalDecision:[{value:false ,  disabled: true}],
      viewAssetType:[{value:false ,  disabled: true}],
    })
  };

  workshopAuctionListFormBuilder(){
    this.workshopAuctionListForm = this._fb.group({
      viewAuctionList:[{value:false ,  disabled: true}],
      viewSoldList:[{value:false ,  disabled: true}],
      exportAuctionList:[{value:false ,  disabled: true}],
      exportSoldList:[{value:false ,  disabled: true}],
      viewItemDetail:[{value:false ,  disabled: true}],
      updateItemDetail:[{value:false ,  disabled: true}],
    })
  }
  workshopTaskMasterFormBuilder(){
    this.workshopTaskMasterForm = this._fb.group({
      TASK_MASTER_VIEW_LIST:[false],
      TASK_MASTER_EXPORT_LIST:[false],
      TASK_MASTER_ADD:[false],
      TASK_MASTER_UPDATE:[false],
      archiveTask:[{value:false ,  disabled: true}]
    })
  };
  configurationUserManagementFormBuilder(){
    this.configurationUserManagementForm = this._fb.group({
      DROLE_VIEW_LIST:[false],
      DROLE_ADD:[false],
      DROLE_UPDATE:[false],
      USER_NORMAL_VIEW_LIST:[false],
      USER_NORMAL_ADD:[false],
      USER_NORMAL_UPDATE:[false]
    })
  };
  configurationAssetPolicyFormBuilder(){
    this.configurationAssetPolicyForm = this._fb.group({
      ASSET_POLICY_ASSET_VIEW_LIST:[false],
      ASSET_POLICY_SUB_ASSET_VIEW_LIST:[false],
      ASSET_POLICY_ASSET_UPDATE:[false],
      ASSET_POLICY_SUB_ASSET_UPDATE:[false],
      ASSET_POLICY_ASSET_ADD:[false],
      ASSET_POLICY_SUB_ASSET_ADD:[false],
    })
  };
  configurationAssetConfigurationFormBuilder(){
    this.configurationAssetConfigurationForm = this._fb.group({
      addAssetConfiguration:[{value:false ,  disabled: true}],
      ASSET_TYPE_VIEW_LIST:[false],
      updateAssetConfiguration:[{value:false ,  disabled: true}],
    })
  };
  configurationUsageCategoryFormBuilder(){
    this.configurationUsageCategoryForm = this._fb.group({
      BUSINESS_CATEGORY_VIEW_LIST:[false],
      BUSINESS_CATEGORY_UPDATE:[false],
      BUSINESS_CATEGORY_ADD:[false],
    })
  };
  configurationOwnershipFormBuilder(){
    this.configurationOwnershipForm = this._fb.group({
      OWNERSHIP_ADD:[false],
      OWNERSHIP_UPDATE:[false],
      OWNERSHIP_VIEW_LIST:[false]
    })
  };
  configurationPeriodicServiceFormBuilder(){
    this.configurationPeriodicServiceForm = this._fb.group({
      PERIODIC_SERVICE_VIEW_LIST:[false],
      PERIODIC_SERVICE_UPDATE:[false],
      PERIODIC_SERVICE_ADD:[false],
    })
  }
  formBuilders(){
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

  getListOfForm(){
    const form = [
      this.fleetAssetForm,
      this.fleetSubAssetForm,
      this.fleetAccessoryForm,
      this.fleetOperatorForm,
      this.fleetMovementForm,
      this.fleetDepartmentForm,
      this.fuelManagementForm,
      // this.trafficFinesForm,
      this.salikForm,
      this.partStorePartListForm,
      this.partStoreOrderListForm,
      this.partStoreSupplierForm,
      // this.partStorePartMasterForm,
      this.workshopBodyshopForm,
      this.workshopServiceshopForm,
      this.workshopTechnicalInspectionForm,
      this.workshopAuctionListForm,
      this.workshopTaskMasterForm,
      this.configurationUserManagementForm,
      this.configurationAssetPolicyForm,
      this.configurationAssetConfigurationForm,
      this.configurationUsageCategoryForm,
      this.configurationOwnershipForm,
      this.configurationPeriodicServiceForm
    ];
    return form
  }
  getTrueValue(){
    const value=[];
    for (let index = 0; index < this.getListOfForm().length; index++) {
      Object.keys(this.getListOfForm()[index].controls).forEach(key =>{
        if(this.getListOfForm()[index].get(key).value){
          value.push(key)
        }
      })
      
    }
    return value
  }

  selectAlForm(form:FormGroup , option:string){
    Object.keys(form.controls).forEach(key =>{
      option == 'select' ? form.get(key).patchValue(true) : form.get(key).patchValue(false)
    })
  }

  patchValueEditForm (){
    this.specificRole.map(
      x=>{
        for (let index = 0; index < this.getListOfForm().length; index++) {
          Object.keys(this.getListOfForm()[index].controls).forEach(key =>{
            if(key == x){
              this.getListOfForm()[index].get(key).patchValue(true)
            }
          })
        }
      }
    )
    this.overView()
  }

  selectTemplate(event){
    for (let index = 0; index < this.getListOfForm().length; index++) {
      Object.keys(this.getListOfForm()[index].controls).forEach(key =>{
        this.getListOfForm()[index].get(key).patchValue(false)
      })
    }
    if(event.value){
      this.specificRole = event.value;
      this.patchValueEditForm();
    }
  }
  tabChanges(){
    this.overView()
  }

  overView(){
    if(this.IsOverview){
      const element = this.roleAndPermision.nativeElement.querySelectorAll('input.custom-checkbox')
      let falseElement=[]
      for (let index = 0; index < element.length; index++) {
        if(!element[index].checked){
          element[index].parentNode.classList.add('d-none')
        }
      }
    }
  }
}
