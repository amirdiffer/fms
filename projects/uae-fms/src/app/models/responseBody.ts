export interface ResponseBody<T> {
  error: boolean;
  resultNumber: number;
  message: T;
}
