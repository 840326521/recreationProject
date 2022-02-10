import Taro from "@tarojs/taro";

const isDev: Boolean = process.env.NODE_ENV === "development";
const env = process.env.TARO_ENV;
const global = Taro.getSystemInfoSync();

type ConfigType = {
  url: string;
  globalData: {
    isWeb: boolean;
    isWeapp: boolean;
    global: typeof global;
  };
};

const srcConfig: ConfigType = {
  url: isDev ? "http://localhost:3000" : "http://localhost:3000",
  globalData: {
    isWeb: env === "h5",
    isWeapp: env === "weapp",
    global
  }
};

export default srcConfig;
