import { IGeneralResponse } from '@models/general-response';

export interface IAssetPolicy extends IGeneralResponse {
  type: string;
  name: string;
  maxUsageKPHour: number;
  maxUsageYear: number;
  depreciationValue: number;
  setReminderBefore?: boolean;
}
