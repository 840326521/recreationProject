import { TypeSkip } from "@/src_types";
import Taro from "@tarojs/taro";
import { isType } from "./styleStringTransformObject";
import config from "@src_config";

const isWeb = config.globalData.isWeb;
const isWeapp = config.globalData.isWeapp;

export const numberFn = (num: string): string => {
  if (num.length === 0) return "";
  num = String((parseInt(num) * 2 ** 10) / 2);
  return num.length >= 5
    ? `${(parseInt(num) / 10000).toFixed(2)}万`
    : /^[ ]+$/.test(num) || num.length === 0
    ? "未知"
    : num;
};

/**
 *
 * @param obj
 * ```tsx
 * Taro 的路由跳转，在 web 端和小程序端跳转的url格式要求不同，这是一个兼容跳转函数。
 * ```
 */
export const skip = <T>(obj: TypeSkip<T>) => {
  let { url, way, targetUrl = "index", data, dataName = "item" } = obj;
  if (config.globalData.isWeb || config.globalData.isWeapp) {
    isType(data, "object") && Taro.setStorageSync(dataName, data);
    url =
      url[0] === "/"
        ? config.globalData.isWeb
          ? url
              .split("/")
              .filter(item => item !== "index")
              .join("/")
          : `${url}/${targetUrl}`
        : `/${url}/${targetUrl}`;
    Taro[way]({
      url
    });
  } else throw new Error("仅支持web端和微信小程序端！");
};

/**
 *
 * @param fn 调用的函数
 * @param wait 间隔的时间 (单位：ms)
 * @returns undefined
 *
 * 函数节流
 */
export const throttle = (fn: Function, wait: number = 1500) => {
  let timer: any;
  return () => {
    if (!timer) clearTimeout(timer);
    timer = setTimeout(fn, wait);
  };
};

export const TaroToast = ({
  title,
  icon = "none",
  mask = true,
  duration = 3000,
  fail,
  success
}: {
  title: string;
  icon?: "success" | "loading" | "none";
  mask?: boolean;
  duration?: number;
  fail?: () => void;
  success?: () => void;
}) => {
  Taro.showToast({
    title,
    icon,
    mask,
    duration,
    fail,
    success
  });
};

export const getDom = <T extends HTMLDivElement>({
  name = ".title-text",
  isFirst = true,
  isCoord = false
}: {
  name: string;
  isFirst?: boolean;
  isCoord?: boolean;
}) => {
  return new Promise<T | null>(resolve => {
    if (isWeb) {
      resolve(document.querySelector<T>(name) as T);
    } else if (isWeapp) {
      const query = Taro.createSelectorQuery()
        [`select${isFirst ? "" : "All"}`](name)
        .boundingClientRect();
      isCoord
        ? query
            .selectViewport()
            .scrollOffset()
            .exec(res => resolve(res[0]))
        : query.exec(res => resolve(res[0]));
    }
    resolve(null)
  });
};

export { default as request } from "./req/req";
export * from "./styleStringTransformObject";
