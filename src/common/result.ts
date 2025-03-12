export interface Result<T = any> {
  data?: T;
  status: number;
  errorMessage?: string;
  success: boolean;
}
