import Taro, { Config } from "@tarojs/taro";

const isDev: Boolean = process.env.NODE_ENV === "development";
const env = process.env.TARO_ENV;
const global = Taro.getSystemInfoSync();

const osFn = (): ConfigType['os'] => {
  var ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    // isChrome = /(?:Chrome|CriOS)/.test(ua),
    isTablet =
      /(?:iPad|PlayBook)/.test(ua) ||
      (isAndroid && !/(?:Mobile)/.test(ua)) ||
      (isFireFox && /(?:Tablet)/.test(ua)),
    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
    isPc = !isPhone && !isAndroid && !isSymbian;
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc
  };
};

type ConfigType = {
  url: string;
  globalData: {
    isWeb: boolean;
    isWeapp: boolean;
    global: typeof global;
  };
  os: {
    isTablet: boolean;
    isPhone: boolean;
    isAndroid: boolean;
    isPc: boolean;
  };
};

const srcConfig: ConfigType = {
  url: isDev ? "http://localhost:3000" : "http://localhost:3000",
  globalData: {
    isWeb: env === "h5",
    isWeapp: env === "weapp",
    global
  },
  os: osFn()
};

export default srcConfig;
