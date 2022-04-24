import Taro, { usePageScroll } from "@tarojs/taro";
import { styled } from "linaria/react";
import {
  bookTypeListItem,
  TypeFingerData,
  TypeTabsProps,
  TypeWxDom
} from "@src_types";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ITouchEvent,
  Swiper,
  SwiperItem,
  Button,
  Image
} from "@tarojs/components";
import { TaroElement } from "@tarojs/runtime";
import { isType, skip, throttle, trimTitleStyleFn, getDom } from "@utils";
import config from "@src_config";

type ExtractName = keyof Pick<TypeFingerData, "startX" | "moveX">;
type TypePartial = Partial<
  Pick<
    TypeFingerData,
    | "isEven"
    | "textWidth"
    | "titleWidth"
    | "windowWidth"
    | "underlineStyle"
    | "percent"
    | "underlineWidth"
    | "wxDomArr"
    | "titleTop"
  >
>;

export default (props: TypeTabsProps) => {
  const global = config.globalData.global;
  const { titleStyle, list, nameObj, onModel } = props;
  const [useTitleStyle, setUseTitleStyle] = useState<CSSProperties>(
    trimTitleStyleFn(titleStyle ?? "")
  );
  const textRef = useRef<TaroElement & HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<
    string | CSSProperties
  >();
  const [fingerData, setFingerData] = useState<TypeFingerData>({
    moveX: 0,
    startX: 0,
    skewing: 0,
    percent: 0,
    currentI: 0,
    titleTop: 0,
    textWidth: 0,
    titleWidth: 0,
    underlineWidth: 0,
    underlineStyle: {},
    windowWidth: -global.windowWidth - 10,
    isEven: false
  });

  const setFingerDataStyleFn = async (
    node: Record<string, any>
  ): Promise<TypePartial> => {
    let textWidth,
      titleWidth,
      isEven,
      _underlineStyle,
      windowWidth,
      percent,
      underlineWidth,
      titleTop;
    if (config.globalData.isWeb && textRef.current) {
      const current = textRef.current;
      textWidth = node.offsetWidth;
      titleTop = current.offsetTop;
      titleWidth = current.scrollWidth;
      windowWidth = fingerData.windowWidth + node.offsetWidth;
      isEven = Math.abs(fingerData.windowWidth) >= titleWidth;
      percent = Math.ceil(global.windowWidth * (isEven ? 0.055 : 0.026));
      underlineWidth = Math.floor(node.offsetWidth * (isEven ? 0.8 : 0.75));
      _underlineStyle = `
        width: ${underlineWidth}PX;
        left: ${percent}PX
      `;
    } else if (config.globalData.isWeapp) {
      titleTop = ((await getDom<TypeWxDom>({ name: ".title" }))! as TypeWxDom)
        .top;
      textWidth = node.width;
      titleWidth = node.width * list.length;
      windowWidth = fingerData.windowWidth + node.width;
      isEven = Math.abs(fingerData.windowWidth) >= titleWidth;
      percent = Math.ceil(global.windowWidth * (isEven ? 0.035 : 0.026));
      underlineWidth = Math.ceil(node.width * 0.75);
      _underlineStyle = `
        width: ${Math.ceil(node.width * 0.75)}PX;
        left: ${percent}PX
      `;
    }
    return {
      isEven,
      percent,
      titleTop,
      textWidth,
      titleWidth,
      windowWidth,
      underlineWidth,
      underlineStyle: {
        ...trimTitleStyleFn(fingerData.underlineStyle, _underlineStyle)
      }
    };
  };

  const setTimeoutFn = () => {
    Taro.showLoading({
      mask: true,
      title: "加载中..."
    });
    setTimeout(async () => {
      if (config.globalData.isWeb && textRef.current!.children[1]) {
        setFingerData({
          ...fingerData,
          ...(await setFingerDataStyleFn(textRef.current!.children[1]))
        });
      } else if (config.globalData.isWeapp) {
        const res = (await getDom<TypeWxDom>({
          name: ".title-text"
        })) as TypeWxDom;
        if (res) {
          setFingerData({
            ...fingerData,
            ...(await setFingerDataStyleFn(res))
          });
        }
      }
      Taro.hideLoading();
    });
  };

  const isNextFn = (max: number = 20): boolean => {
    const { startX, moveX } = fingerData;
    const py = moveX - startX;
    return moveX === 0 || Math.abs(py) <= max;
  };

  const setFingerDataFn = (e: any, name: ExtractName) => {
    let clientX: number = config.globalData.isWeapp
      ? e.touches[0].clientX
      : config.globalData.isWeb
      ? e.targetTouches[0].clientX
      : -1;
    if (clientX < 0) return;
    fingerData[name] = Math.floor(clientX);
    setFingerData({ ...fingerData });
  };

  const touchMove = () => {
    if (isNextFn()) return;
    const { startX, moveX, skewing, windowWidth } = fingerData;
    const currentSkewing = Math.floor(skewing + (moveX - startX));
    fingerData.skewing =
      currentSkewing >= 0
        ? 0
        : currentSkewing <= windowWidth
        ? windowWidth
        : currentSkewing;
    setFingerData({ ...fingerData });
  };

  const touchHandler = (status: 0 | 1 | 2, e: ITouchEvent) => {
    if (fingerData.isEven) return;
    switch (status) {
      case 0:
      case 1:
        setFingerDataFn(e, `${status ? "move" : "start"}X`);
        status === 1 && touchMove();
        break;
      case 2:
        !isNextFn() &&
          setTransformStyle(
            trimTitleStyleFn(
              transformStyle ?? "",
              `transform: translateX(${fingerData.skewing}PX)`
            )
          );
        break;
    }
  };

  const titleClick = (left: number, i: number) => {
    if (left === -1) return;
    if (i !== fingerData.currentI) {
      const currentLeft =
        i === 0
          ? fingerData.percent
          : fingerData.isEven
          ? left +
            (config.globalData.isWeapp ? 11 : config.globalData.isWeb ? 9 : 0)
          : fingerData.percent + fingerData.textWidth * i;
      fingerData.currentI = i;
      fingerData.underlineStyle = trimTitleStyleFn(
        fingerData.underlineStyle,
        `left: ${currentLeft}PX`
      );
      setFingerData({ ...fingerData });
    }
  };

  const TransitionHandler = async (e: any) => {
    const current = e.detail.current;
    if (!Array.isArray(fingerData.wxDomArr)) {
      const res: any = (await getDom<TypeWxDom>({
        name: ".title-text"
      })) ;
      fingerData.wxDomArr = res;
      setFingerData({ ...fingerData });
    }
    if (fingerData.currentI !== current) {
      const left = config.globalData.isWeb
        ? (textRef.current?.children[current + 1] as any).offsetLeft
        : config.globalData.isWeapp
        ? Math.round(fingerData.wxDomArr![current].left)
        : null;
      if (left !== null) {
        const i =
          current - Math.round(global.windowWidth / fingerData.textWidth) + 1;
        setTransformStyle(
          i >= 0
            ? trimTitleStyleFn(
                transformStyle ?? "",
                `transform: translateX(-${fingerData.textWidth * i + 10}PX)`
              )
            : ""
        );
        titleClick(Math.ceil(left), current);
      }
    }
  };

  const cssNameArr = ["position", "top", "zIndex"];

  const setUseTitleStyleFn = (top: number | any) => {
    top =
      isType(top, "event") && config.globalData.isWeb
        ? top.target.scrollTop
        : top;
    if (!top) return;
    if (
      !cssNameArr.every(item => Reflect.has(useTitleStyle, item)) &&
      top >= fingerData.titleTop
    ) {
      setUseTitleStyle(
        trimTitleStyleFn(useTitleStyle, {
          position: "sticky",
          top: 0,
          zIndex: 100
        })
      );
    } else if (top <= fingerData.titleTop) {
      const currentObj = {};
      Reflect.ownKeys(useTitleStyle).forEach(item => {
        if (!cssNameArr.some(c_item => c_item === item))
          Reflect.set(currentObj, item, useTitleStyle[item]);
      });
      setUseTitleStyle(currentObj);
    }
  };

  usePageScroll(
    e => config.globalData.isWeapp && setUseTitleStyleFn(e.scrollTop)
  );

  useEffect(() => {
    if (config.globalData.isWeb) {
      document
        .querySelector(".taro_page")
        ?.addEventListener("scroll", throttle(setUseTitleStyleFn));
    }
    setTimeoutFn();
  }, [props.list]);

  return (
    <FlexTitle>
      <View className="title" style={useTitleStyle}>
        <View
          ref={textRef}
          style={transformStyle}
          onTouchStart={e => touchHandler(0, e)}
          onTouchMove={e => touchHandler(1, e)}
          onTouchEnd={e => touchHandler(2, e)}
          className={`title-box ${fingerData.isEven ? "view-flex" : ""}`}
        >
          <View className="title-underline" style={fingerData.underlineStyle} />
          {list.map((item, i) =>
            item[nameObj.titleName] ? (
              <Text
                className="title-text"
                style={{
                  color: `${i === fingerData.currentI ? "#4FC08D" : ""}`
                }}
                key={item[nameObj.titleName]}
                onClick={(e: any) => {
                  titleClick(
                    config.globalData.isWeb
                      ? e.path[0].offsetLeft
                      : config.globalData.isWeapp
                      ? e.mpEvent.currentTarget.offsetLeft
                      : -1,
                    i
                  );
                }}
              >
                {item[nameObj.titleName]}
              </Text>
            ) : null
          )}
        </View>
      </View>
      <Swiper
        className="title-swiper"
        current={fingerData.currentI}
        onAnimationFinish={TransitionHandler}
      >
        {list.map((item, i) => {
          if (item[nameObj.contentName]) {
            return (
              <SwiperItem className="title-swiper-item" key={i}>
                <Button
                  className="swiper-item-btn"
                  size="mini"
                  plain={true}
                  style={{ height: "40PX", lineHeight: "40PX" }}
                >
                  {`更多${item[nameObj.titleName]}`}
                </Button>
                {item[nameObj.contentName].map(
                  (_item: bookTypeListItem, _i: number) => {
                    const {
                      book_name,
                      book_author,
                      book_img,
                      book_intro,
                      book_id
                    } = _item;
                    return (
                      <View key={book_id} className="title-swiper-item-view">
                        <Image
                          className="title-swiper-item-view-img"
                          src={`${config.url}${book_img}`}
                          onClick={() =>
                            skip<typeof _item & { book_type: string }>({
                              url: "pages/index/book",
                              way: "navigateTo",
                              data: {
                                ..._item,
                                book_type: item[nameObj.titleName]
                              }
                            })
                          }
                        />
                        <View
                          className="title-swiper-item-view-content"
                          onClick={() =>
                            skip<typeof _item & { book_type: string }>({
                              url: "pages/index/book",
                              way: "navigateTo",
                              data: {
                                ..._item,
                                book_type: item[nameObj.titleName]
                              }
                            })
                          }
                        >
                          <Text>{`《${book_name}》`}</Text>
                          <Text>{`作者：${book_author}`}</Text>
                          <View className="title-swiper-item-view-omit">{`简介：${book_intro}`}</View>
                        </View>
                        {book_intro.length > 15 && (
                          <Button
                            className="swiper-item-view-btn"
                            size="mini"
                            plain={true}
                            onClick={onModel?.bind(null, book_intro)}
                          >
                            查看简介
                          </Button>
                        )}
                      </View>
                    );
                  }
                )}
              </SwiperItem>
            );
          }
          return null;
        })}
      </Swiper>
    </FlexTitle>
  );
};

const FlexTitle = styled(View)`
  height: 100%;
  display: flex;
  flex-direction: column;
  .title {
    .title-box {
      position: relative;
      white-space: nowrap;
      transition: all 0.2s;
      .title-underline {
        height: 2px;
        position: absolute;
        bottom: 5px;
        background-color: #1cbb9a;
        transition: all 0.5s;
      }
    }
    .title-text {
      padding: 0 10px;
      line-height: 50px;
      text-align: center;
      white-space: nowrap;
      font-size: 16px;
      box-sizing: border-box;
      transition: all 0.5s;
    }
  }
  .title-swiper {
    height: 100vh;
    .title-swiper-item {
      height: 90% !important;
      padding-top: 40px;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 4px;
        display: none;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 20px;
        background-color: #282c34;
      }
      .swiper-item-btn {
        font-size: 16px;
        padding: 0;
        height: 30px;
        line-height: 30px;
        position: absolute;
        top: 0;
        right: 15px;
        border: none;
      }
      .title-swiper-item-view {
        transition: all 0.5s;
        position: relative;
        display: flex;
        justify-content: space-evenly;
        margin-bottom: 20px;
        paddding: 20px 0;
        box-sizing: border-box;
        .title-swiper-item-view-img {
          width: 25%;
          height: 120px;
        }
        .title-swiper-item-view-content {
          width: 70%;
          display: flex;
          font-size: 18px;
          flex-direction: column;
          justify-content: space-between;
          .title-swiper-item-view-omit {
            font-size: 16px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .swiper-item-view-btn {
          height: 24px;
          padding: 0;
          line-height: 24px;
          position: absolute;
          z-index: 10;
          bottom: -25px;
          right: 15px;
          border: none;
        }
      }
    }
  }
`;
