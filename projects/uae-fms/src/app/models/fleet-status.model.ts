import { IGeneralResponse } from '@models/general-response';

export interface IFleetStatus extends IGeneralResponse {
  id: number;
  type: string;
  category: string;
  status: Array<string>;
  tag: Array<string>;
  totalCount: number;
}
