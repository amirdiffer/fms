export interface IFuelManagementFuelCard {
    id:string;
    tagNumber:string;
    used:IFuelManagementFuelCardUsed[];
    usageLimit:string;
    assignedTo:string;
    cardType:string;
    expireDate:string;
            
}


interface IFuelManagementFuelCardUsed{
    amount:number;
    mileage:number;
    data:string;
}