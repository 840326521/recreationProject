import { AxiosRequestConfig } from "taro-axios";
import request from "./taro_axios";

export default function useData<T>(option: AxiosRequestConfig) {
  console.log("小程序发送的请求");
  return request<T>(option);
}
