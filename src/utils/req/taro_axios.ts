import srcConfig from "@src_config";
import Taro from "@tarojs/taro";
import axios, { AxiosRequestConfig, AxiosResponse } from "taro-axios";

const http = axios.create({
  timeout: 10000,
  baseURL: srcConfig.url
});

// 响应前
http.interceptors.request.use(
  request => {
    Taro.showLoading({
      mask: true,
      title: "请求中..."
    });
    return request;
  },
  error => {}
);

// 响应后
http.interceptors.response.use(response => {
  Taro.hideLoading();
  return response;
});

const request = <T>(option: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  const { url, params, data } = option;
  const method = option.method?.toLocaleUpperCase() ?? "GET";
  Reflect.set(option, "method", method);
  if (method && method === "GET") {
    return http.get(url!, params ?? {});
  } else if (method === "POST") {
    return http.post(url!, data ?? {});
  }
  return http(option);
};

export default request;
