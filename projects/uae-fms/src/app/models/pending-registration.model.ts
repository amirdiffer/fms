export interface IPendingRegistration {
  id?: number;
  avatarId?: number;
  dpd?: string;
  plateNumber?: number;
  status?: string;
  department?: IDepartment;
  operator?: IOperator;
  assetTypeId?: number;
  assetTypeName?: string;
  makeId?: number;
  makeName?: string;
  modelId?: number;
  modelName?: string;
  year?: string;
  trimId?: number;
  trimName?: string;
  colorId?: number;
  colorName?: string;
  tollId?: number;
  fuelCardId?: number;
  plateCategory?: string;
  plateCode?: string;
  chasisNumber?: string;
}

export interface IOperator {
  id?: number;
  firstName?: string;
  lastName?: string;
}

export interface IDepartment {
  id?: number;
  name?: string;
  organizationId?: number;
  organizationName?: string;
}

export interface ITrafficFineVehicleInfo {
  responseType?: {
    responseCode?: string;
    responseDescEn?: string;
    responseDescAr?: string;
  };
  vehicleReturn?: ITrafficFineVehicleInfoVehicleReturn;
}

export interface ITrafficFineVehicleInfoVehicleReturn {
  customerInfo?: {
    trafficFileId?: string;
    trafficFileNumber?: string;
    nameA?: string;
    nameE?: string;
    nationality?: string;
    nationalityE?: string;
    nationalityId?: string;
    passportNo?: string;
    passportExpiryDate?: string;
    workPhone?: string;
    phone?: string;
    mobile?: string;
    address?: string;
    email?: string;
    eidNo?: string;
    emirateExpiryDate?: string;
    unifiedId?: string;
    licenseInfo?: {
      licenseSource?: string;
      licenseStatus?: string;
      licenseStatusAr?: string;
      licenseStatusEn?: string;
      licenseType?: string;
      licenseTypeAr?: string;
      licenseTypeEn?: string;
    };
    ownerType?: string;
  };
  vehicleInfo?: ITrafficFineVehicleInfoVehicleInfo;
}

export interface ITrafficFineVehicleInfoVehicleInfo {
  vehicleId?: string;
  vehicleSourceType?: string;
  vehicleSourceTypeAr?: string;
  vehicleSourceTypeEn?: string;
  vehicleSourceDate?: string;
  carryWeight?: string;
  unloadedWeight?: string;
  cylinders?: string;
  dataType?: string;
  transactionType?: string;
  transactionTypeDescAr?: string;
  transactionTypeDescEn?: string;
  vehicleCountryId?: string;
  vehicleCountryAr?: string;
  vehicleCountryEn?: string;
  vehicleDescripitonId?: string;
  vehicleDescription?: string;
  vehicleDescriptionAr?: string;
  modelYear?: string;
  engCapacity?: string;
  odometerReading?: string;
  axesNumber?: string;
  noOfDoors?: string;
  noOfSeats?: string;
  engineNo?: string;
  fuelId?: string;
  fuelType?: string;
  fuelTypeEn?: string;
  modelNameAr?: string;
  modelNameEn?: string;
  modelStatus?: string;
  bookletId?: string;
  chassisNo?: string;
  wheelDrive?: string;
  wheelDriveDescA?: string;
  wheelDriveDescE?: string;
  regExpiryDate?: string;
  registerationDate?: string;
  emirateExportFromAr?: string;
  emirateExportFromEn?: string;
  makeId?: string;
  manufactureTypeEn?: string;
  manufactureTypeAr?: string;
  manufactureStatus?: string;
  insuranceTypeId?: string;
  insuranceTypeEn?: string;
  insuranceTypeAr?: string;
  insurranceCompanyId?: string;
  insurranceCompanyEn?: string;
  insurranceCompanyAr?: string;
  insurranceExpiryDate?: string;
  insurranceRefNo?: string;
  mortgageFlagDescEn?: string;
  mortgageFlagDescAr?: string;
  mortgageReferenceNo?: string;
  mortgageDate?: string;
  mortgageCompanyId?: string;
  mortgageCompanyNameAr?: string;
  mortgageCompanyNameEn?: string;
  isExpired?: string;
  expiredDescAr?: string;
  expiredDescEn?: string;
  isInBasket?: string;
  inBasketDescAr?: string;
  inBasketDescEn?: string;
  isVip?: string;
  isMortgaged?: string;
  isElectronicInsuranceExist?: string;
  vehicleHasPassTest?: string;
  hasMortgageRelease?: string;
  hasAssignedVehicle?: string;
  vehicleRenewable?: string;
  vehicleRenewableAr?: string;
  vehicleRenewableEn?: string;
  dueForTest?: string;
  dueForTestDescAr?: string;
  dueForTestDescEn?: string;
  isValid?: string;
  colorList?: {
    colorIdList?: string;
    colorDescAr?: string;
    colorDescEn?: string;
  };
  vehicleClass?: {
    vehicleClassCode?: string;
    vehicleClassDescriptionAr?: string;
    vehicleClassDescriptionEn?: string;
  };
  plate?: {
    plateId?: string;
    plateNumber?: string;
    plateSource?: string;
    plateStatus?: string;
    plateStatusDesc?: string;
    plateInfoEn?: string;
    plateInfoAr?: string;
    frontPlateSizeId?: string;
    backPlateSizeId?: string;
    stillOld?: string;
    stillOldDescA?: string;
    stillOldDescE?: string;
    plateLogo?: {
      plateLogoId?: string;
      plateLogoCode?: string;
    };
    category?: {
      categoryCode?: string;
      categoryDescriptionEn?: string;
      categoryDescriptionAr?: string;
      cfiCode?: string;
    };
    code?: {
      plateCodeId?: string;
      plateCodeDescriptionEn?: string;
      plateCodeDescriptionAr?: string;
      cfiCode?: string;
    };
    source?: {
      plateEmirateId?: string;
      plateSourceEn?: string;
      plateSourceAr?: string;
    };
  };
  electronicInsurance?: {
    insuranceCompanyId?: string;
    insuranceId?: string;
  };
  relatedTranscation?: {
    transactionId?: string;
    employeeNameAr?: string;
    employeeNameEn?: string;
    transactionDate?: string;
    centerNameA?: string;
    centerNameE?: string;
  };
  modelId?: string;
}
