export interface IFuelManagementFuelCard {
  id: number;
  tagNo: {
    tagNo: string;
    data: IFuelManagementFuelCardUsed[];
  };
  used: string;
  usageLimit: string;
  asset: string;
  cardType: string;
  expire: string;
  statusColor: string;
}

interface IFuelManagementFuelCardUsed {
  litters: string;
  km: string;
  day: string;
  date: string;
  time: string;
}
