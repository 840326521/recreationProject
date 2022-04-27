import "./index.less";
import React, { useState } from "react";
import { getDom } from "@/utils";
import { useReady } from "@tarojs/taro";
import { PropsType } from "@/src_types";
import { View } from "@tarojs/components";
import srcConfig from "@src_config";
import _ from "lodash";

type TypeState = {
  /** 子元素是否显示 */
  isShow: boolean;
  /** title 元素的宽度 */
  width: number | undefined;
  coordObj: {
    /** 是否按下 */
    isPress: boolean;
    /** 是否滑动 */
    isMove: boolean;
    /** 按下时，X的坐标值 */
    startX: number;
    /** 按下时，Y的坐标值 */
    startY: number;
    /** 滑动时，X的坐标值 */
    moveX: number;
    /** 滑动时，Y的坐标值 */
    moveY: number;
  };
};
const wait = 500;
export default ({
  children,
  title = "菜单12312"
}: PropsType.ComponentPropsType.MenusProps) => {
  const { isWeb, isWeapp } = srcConfig.globalData;
  const [state, setState] = useState<TypeState>({
    isShow: false,
    width: undefined,
    coordObj: {
      isPress: false,
      isMove: false,
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0
    }
  });

  useReady(async () => {
    const menus_title = await getDom({ name: ".menus_title" });
    setState({
      ...state,
      width: menus_title![isWeb ? "offsetWidth" : "width"]
    });
  });

  const getValFn = (n: "top" | "left", target: HTMLDivElement | null) =>
    isWeb
      ? target?.[`offset${n.replace(n[0], n[0].toUpperCase())}`]
      : isWeapp
      ? target?.[n]
      : 0;

  const getCoordFn = (e: any): { clientX: number; clientY: number } => {
    const getVal = (n: "clientX" | "clientY") =>
      isWeb
        ? e[n] || e.changedTouches[0][n]
        : isWeapp
        ? e.changedTouches[0][n]
        : 0;
    return {
      clientX: getVal("clientX"),
      clientY: getVal("clientY")
    };
  };

  const handleStart = async (e: any) => {
    if (isWeb || isWeapp) {
      const { clientX: startX, clientY: startY } = getCoordFn(e);
      const menus_title = await getDom({ name: ".menus_title" });
      const [top, left] = (['top', 'left'] as const).map(item => getValFn(item, menus_title))
      state.coordObj = {
        ...state.coordObj,
        isPress: true,
        startX: startX - left,
        startY: startY - top
      };
      setState({ ...state });
    }
  };

  const handleMove = (e: any) => {
    const { isPress, startX, startY } = state.coordObj;
    if (isPress && (isWeb || isWeapp)) {
      const { clientX: moveX, clientY: moveY } = getCoordFn(e);
      setState({
        ...state,
        coordObj: {
          ...state.coordObj,
          moveX: moveX - startX,
          moveY: moveY - startY,
          isMove: true
        }
      });
    }
  };

  const handleEnd = (e: any) => {
    const { isPress, isMove } = state.coordObj;
    if (isPress && isMove && (isWeb || isWeapp)) {
      setState({
        ...state,
        coordObj: {
          ...state.coordObj,
          isPress: false,
          isMove: false
        }
      });
    }
  };

  return (
    (isWeb && (
      <div className="menus">
        <div
          className="menus_title"
          onTouchStart={_.throttle(handleStart, wait)}
          onTouchMove={_.throttle(handleMove)}
          onTouchEnd={_.throttle(handleEnd, wait)}
          onMouseDown={_.throttle(handleStart, wait)}
          onMouseMove={_.throttle(handleMove)}
          onMouseUp={_.throttle(handleEnd, wait)}
          style={{
            height: `${state.width}PX`,
            top: !state.coordObj.moveY ? "" : state.coordObj.moveY,
            left: !state.coordObj.moveX ? "" : state.coordObj.moveX
          }}
        >
          {title}
        </div>
        {children}
      </div>
    )) ||
    (isWeapp && (
      <View className="menus">
        <View
          className="menus_title"
          onTouchStart={_.throttle(handleStart, wait)}
          onTouchMove={_.throttle(handleMove)}
          onTouchEnd={_.throttle(handleEnd, wait)}
          style={{
            height: `${state.width}PX`,
            top: !state.coordObj.moveY ? "" : state.coordObj.moveY,
            left: !state.coordObj.moveX ? "" : state.coordObj.moveX
          }}
        >
          {title}
        </View>
        {children}
      </View>
    )) ||
    null
  );
};
