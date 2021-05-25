export interface IAccessory {
  id: number;
  itemName: string;
  assignedToType: string;
  assignedToEntity: number;
  accessoryTypeId: number;
  quantity: number;
  assignedToEmployeeId: number;
}

export interface IAccessoryOverview{
  totalNumOfAccessories: number;
  numOfInactiveAccessories: number;
  numOfAssignedAccessories: number;
}
