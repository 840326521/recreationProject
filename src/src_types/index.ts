import { CSSProperties } from "react";

export type TypeItem = {
  id: string;
  book_type: string;
  book_id: string;
  book_name: string;
  book_author: string;
  book_size: string;
  book_img: string;
  book_intro: string;
};

export type TypeBannerItem = {
  id: string;
  book_type: string;
  banner: {
    book_id: string;
    book_name: string;
    book_author: string;
    book_size: string;
    book_img: string;
    book_intro: string;
  };
};

export type TypeBookList = {
  bannerArr: Array<TypeBannerItem>;
  bookTypeList: Array<TypeBookTypeList>;
};

export type TypeTabsProps = {
  onModel?: (val: string) => void;
  nameObj: {
    titleName: string;
    contentName: string;
  };
  // children: ReactElement;
  list: Array<TypeBookTypeList>;
  titleStyle?: string | CSSProperties;
};

export type TypeBookTypeList = {
  title_name: string;
  list: Array<bookTypeListItem>;
};

export type bookTypeListItem = {
  book_name: string;
  book_author: string;
  book_id: string;
  book_intro: string;
  book_img: string;
};

export type TypeData = {
  text: string;
  isShow: boolean;
};

/** 微信获取的 Dom 类型 */
export type TypeWxDom = {
  bottom: number;
  dataset: Record<string, any>;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
};

export type TypeFingerData = {
  /** title 元素距离页面顶部的距离 */
  titleTop: number;

  /** 小程序 Dom 数组 */
  wxDomArr?: Array<TypeWxDom>;

  /** 下划线的宽度 */
  underlineWidth: number;

  /** 百分比 */
  percent: number;

  /** 当前被选中的 title 下标 */
  currentI: number;

  /** 屏幕的宽度是否大于所有元素宽度的总合 */
  isEven: boolean;

  /** 按下时，开始的 X 坐标 */
  startX: number;

  /** 滑动时 X 的坐标 */
  moveX: number;

  /** moveX - startX 的结果 */
  skewing: number;

  /** 单个 text 的宽度 */
  textWidth: number;

  /** title 标签的总宽度 */
  titleWidth: number;

  /** 屏幕的宽度 */
  windowWidth: number;

  /** 下划线的样式 */
  underlineStyle: CSSProperties;
};

export enum ENV_TYPE {
  WEAPP = "WEAPP",
  WEB = "WEB",
  RN = "RN",
  SWAN = "SWAN",
  ALIPAY = "ALIPAY",
  TT = "TT",
  QQ = "QQ",
  JD = "JD"
}

export type TypeSkip<T> = {
  /** 跳转的路径 */
  url: string;
  /**
   * ```tsx
   * - switchTab:     跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
   * - reLaunch:      关闭所有页面，打开到应用内的某个页面。
   * - redirectTo:    关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
   * - navigateTo:    保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 Taro.navigateBack 可以返回到原页面。小程序中页面栈最多十层。
   * ```
   */
  way: "switchTab" | "reLaunch" | "redirectTo" | "navigateTo";

  /** 前往的页面路径的最后一个值，用来适配前往不同页面的路径，默认是 index */
  targetUrl?: string;

  /** 需要缓存的数据 */
  data?: T;

  /** 需要缓存的键名 */
  dataName?: string;
};

export type TypeBookSection = {
  /** 章节总数 */
  count: number;

  /** 章节类型id */
  book_type_id: string;

  /** 章节列表数组 */
  section_list: Array<{
    /** 每个章节名称的id */
    section_id: string;

    /** 每个章节的名称 */
    section_name: string;
  }>;
};

export namespace TypeDetailData {
  export interface Detail {
    /** 书的id */
    book_id: string;

    /** 书的名称 */
    book_name: string;

    /** 书的类型id */
    book_type_id: string;

    /** 章节id */
    section_id: string;

    /** 章节名称 */
    section_name: string;
  }

  export interface Section {
    /** 上一章 id */
    up_section_id: string | null;

    /** 下一章 id */
    next_section_id: string | null;

    /** 本章内容 */
    textArr: Array<string>;
  }

  export interface StyeData {
    textStyle: CSSProperties;
    globalStyle: CSSProperties;
  }

  export interface Coord {
    /* 开始 X 坐标 */
    startX: number,

    /* 开始 Y 坐标 */
    startY: number,

    /* 结束 X 坐标 */
    endX: number,

    /* 结束 Y 坐标 */
    endY: number
  }
}

export * from "./req";
