export interface ResponseBody<T> {
  error: boolean;
  result_number: number;
  message: T;
}
