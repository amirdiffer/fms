export interface IToll {
  id: number;
  tollTag: string;
  status?: string;
  relatedAssetId?: number;
  purchaseDate: string;
}
