import { AxiosResponse } from "axios";
import { AxiosRequestConfig } from "taro-axios";

export default async function<T>(_option: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return {} as Promise<AxiosResponse<T>>;
}
