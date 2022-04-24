import React, { useState } from "react";
import "./index.less";
import { getDom } from "@/utils";
import { useReady } from "@tarojs/taro";
import { PropsType } from "@/src_types";

type TypeState = {
  name: string;
  isShow: boolean;
  width: number | undefined;
  coordObj: {
    isPress: boolean;
    isMove: boolean;
    startX: number;
    startY: number;
    moveX: number;
    moveY: number;
  };
};

export default ({
  children,
  title = "菜单12312"
}: PropsType.ComponentPropsType.MenusProps) => {
  const [state, setState] = useState<TypeState>({
    name: "小明",
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
    console.dir(await getDom({ name: ".menus_title" }));
    setState({
      ...state,
      width: (await getDom({ name: ".menus_title" }))?.offsetWidth
    });
  });
  const handleStart = (e: any) => {
    state.coordObj.isPress = true;
    console.log(state)
    console.log(e);
  };
  const handleMove = (e: any) => {
    console.log(e);
  };
  const handleEnd = (e: any) => {
    console.log(e);
  };
  console.log(state);
  return (
    <div className="menus">
      <div
        className="menus_title"
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        style={{ height: `${state.width}PX` }}
      >
        {title}
      </div>
      {children}
    </div>
  );
};
