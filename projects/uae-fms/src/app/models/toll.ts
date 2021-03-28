export interface IToll {
  id: number;
  tollTag: string;
  status?: string;
  relatedAsset?: {
    id: number;
    dpd: string;
  };
  purchaseDate: string;
}
