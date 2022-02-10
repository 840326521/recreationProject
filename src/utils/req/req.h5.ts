import { AxiosResponse } from "axios";
import { AxiosRequestConfig } from "taro-axios";
import request from "./taro_axios";

export default async function<T>(
  option: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  return request<T>(option);
}
