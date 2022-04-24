import "./index.less";
import { TypeDetailData } from "@/src_types";
import { request, skip, throttle } from "@utils";
import { ScrollView, View, Text } from "@tarojs/components";
import Taro, { useReady } from "@tarojs/taro";
import { Menus } from "@p_c";
import React, { useRef, useState } from "react";
import { ActionSheet, Button, Stepper } from "@antmjs/vantui";

type CurrentTypeDetailData = {
  detail: TypeDetailData.Detail;
  section: TypeDetailData.Section;
};

export default () => {
  const ScrollViewRef = useRef();
  const panelObj = Taro.getStorageSync<{
    idxArr: Array<number>;
    styleData: TypeDetailData.StyeData;
  }>("panelObj");
  const typefaceObj = {
    宋体: "SimSun",
    正黑体: "Microsoft JhengHei",
    雅黑:
      "'Microsoft YaHei',PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light',sans-serif",
    楷书: "Kaiti",
    仿宋: "FangSong",
    黑体: "SimHei"
  };
  const panelArr: Array<Array<string>> = [
    ["雅黑", "正黑体", "宋体", "楷书", "仿宋", "黑体"],
    ["#000", "#DCCC9E", "#CFE1CF", "#D1E0E4", "#4B3535", "#CFCFCF", "#FB6B84"],
    ["#fff", "#1A73E8", "#2A382A", "#C66834", "#322D24", "#2E393D", "#DF9538"]
  ];
  const init_obj = {
    idxArr: [0, 20, 0, 20, 0, 0],
    styleData: {
      globalStyle: {
        ...(panelObj?.styleData.globalStyle || {}),
        color: panelArr[1][0],
        fontFamily: typefaceObj[panelArr[0][0]],
        backgroundColor: panelArr[2][0]
      },
      textStyle: {
        ...(panelObj?.styleData.textStyle || {}),
        transition: "all 0.5s",
        fontSize: "20PX",
        textIndent: "2em",
        marginBottom: "20PX"
      }
    }
  };
  const [idxArr, setIdxArr] = useState<Array<number>>(init_obj.idxArr);
  const [styleData, setStyleData] = useState<TypeDetailData.StyeData>(
    init_obj.styleData
  );
  const [detailData, setDetailData] = useState<CurrentTypeDetailData>({
    detail: {
      book_id: "",
      book_name: "",
      section_id: "",
      book_type_id: "",
      section_name: ""
    },
    section: {
      up_section_id: "",
      textArr: [],
      next_section_id: ""
    }
  });
  const [isShow, setIsShow] = useState<boolean>(false);
  useReady(async () => {
    const detail: TypeDetailData.Detail = Taro.getStorageSync("detail") || {
      book_id: "13329",
      book_name: "异世灵武天下",
      book_type_id: "13",
      section_id: "3505153",
      section_name: "第一章 人品问题"
    };
    if (!detail) {
      return skip({
        url: "pages/index",
        way: "navigateTo"
      });
    }
    const { data: section } = await request<TypeDetailData.Section>({
      url: "book/getBookSection",
      method: "post",
      data: {
        book_type_id: detail.book_type_id,
        book_id: detail.book_id,
        section_id: detail.section_id
      }
    });
    setDetailData({
      section,
      detail
    });
    Taro.setNavigationBarTitle({
      title: `《${detail.book_name}》  ${detail.section_name}`
    });
  });

  const setStyleFn = ({
    globalStyle,
    textStyle,
    idx,
    i
  }: TypeDetailData.StyeData & { idx: number; i: number }) => {
    const styleData = { globalStyle, textStyle };
    idxArr[idx] = i;
    setStyleData(styleData);
    setIdxArr([...idxArr]);
    Taro.setStorageSync("panelObj", {
      styleData,
      idxArr
    });
  };

  return (
    <ScrollView
      className="scroll-view"
      scrollY
      style={styleData.globalStyle}
      ref={ScrollViewRef}
    >
      <Menus title="我是传过去的title">
        <div></div>
      </Menus>
      <View className="scroll-view-title">
        {detailData.detail.section_name}
      </View>
      {detailData.section.textArr.length > 0 ? (
        <View
          className="scroll-view-content"
          onClick={throttle(() => setIsShow(true), 100)}
        >
          {detailData.section.textArr.map((item, i) => (
            <View style={styleData.textStyle} key={i}>
              {item}
            </View>
          ))}
        </View>
      ) : null}
      <ActionSheet
        className="ActionSheet"
        show={isShow}
        title="样式设置面板1"
        onClose={throttle(() => setIsShow(false), 100)}
      >
        <View className="ActionSheet-content">
          <View className="ActionSheet-content-bgColor">
            <Text style="width: 25%; font-size: 16PX;">文字类型:</Text>
            <View className="ActionSheet-content-bgColor-c buttonStyle">
              {panelArr[0].map((item, i) => (
                <Button
                  className="btn"
                  style={`${
                    i === idxArr[0] ? "border: 1px solid #1CBB9A" : ""
                  }`}
                  size="small"
                  key={item}
                  onClick={() =>
                    setStyleFn({
                      ...styleData,
                      globalStyle: {
                        ...styleData.globalStyle,
                        fontFamily: typefaceObj[panelArr[0][i]]
                      },
                      idx: 0,
                      i
                    })
                  }
                >
                  {item}
                </Button>
              ))}
            </View>
          </View>
          <View className="ActionSheet-content-bgColor">
            <Text style="width: 25%; font-size: 16PX;">行间距:</Text>
            <Stepper
              min={20}
              max={100}
              step={10}
              value={idxArr[1]}
              theme="round"
              disableInput
              style="width: 80%;"
              buttonSize={50}
              onChange={({ detail: v }) => {
                setStyleFn({
                  ...styleData,
                  textStyle: {
                    ...styleData.textStyle,
                    marginBottom: `${v}PX`
                  },
                  idx: 1,
                  i: +v
                });
              }}
            />
          </View>
          <View className="ActionSheet-content-bgColor">
            <Text style="width: 25%; font-size: 16PX;">文字间距:</Text>
            <Stepper
              min={0}
              max={20}
              step={1}
              value={idxArr[2]}
              theme="round"
              disableInput
              style="width: 80%;"
              buttonSize={50}
              onChange={({ detail: v }) => {
                setStyleFn({
                  ...styleData,
                  textStyle: {
                    ...styleData.textStyle,
                    letterSpacing: `${v}PX`
                  },
                  idx: 2,
                  i: +v
                });
              }}
            />
          </View>
          <View className="ActionSheet-content-bgColor">
            <Text style="width: 25%; font-size: 16PX;">字体大小:</Text>
            <Stepper
              min={20}
              max={72}
              step={2}
              value={idxArr[3]}
              theme="round"
              disableInput
              style="width: 80%;"
              buttonSize={50}
              onChange={({ detail: v }) => {
                setStyleFn({
                  ...styleData,
                  textStyle: {
                    ...styleData.textStyle,
                    fontSize: `${v}PX`
                  },
                  idx: 3,
                  i: +v
                });
              }}
            />
          </View>
          <View className="ActionSheet-content-bgColor">
            <Text style="width: 25%; font-size: 16PX;">文字颜色:</Text>
            <View className="ActionSheet-content-bgColor-c">
              {panelArr[1].map((item, i) => (
                <View
                  className={`ActionSheet-content-bgColor-c-i ${
                    i === idxArr[4] ? "selectend" : ""
                  }`}
                  key={item}
                  style={{ backgroundColor: item }}
                  onClick={() =>
                    setStyleFn({
                      ...styleData,
                      globalStyle: {
                        ...styleData.globalStyle,
                        color: panelArr[1][i]
                      },
                      idx: 4,
                      i
                    })
                  }
                />
              ))}
            </View>
          </View>
          <View className="ActionSheet-content-bgColor">
            <Text style="width: 25%; font-size: 16PX;">背景颜色:</Text>
            <View className="ActionSheet-content-bgColor-c">
              {panelArr[2].map((item, i) => (
                <View
                  className={`ActionSheet-content-bgColor-c-i ${
                    i === idxArr[5] ? "selectend" : ""
                  }`}
                  key={item}
                  style={{ backgroundColor: item }}
                  onClick={() =>
                    setStyleFn({
                      ...styleData,
                      globalStyle: {
                        ...styleData.globalStyle,
                        backgroundColor: panelArr[2][i]
                      },
                      idx: 5,
                      i
                    })
                  }
                />
              ))}
            </View>
          </View>
        </View>
        <Button
          round
          type="info"
          size="large"
          style="width: calc(100% - 20PX); height: 40PX; font-size: 20PX;margin: 10PX;"
          onClick={() => {
            setIdxArr(init_obj.idxArr);
            setStyleData(init_obj.styleData);
          }}
        >
          恢复
        </Button>
      </ActionSheet>
    </ScrollView>
  );
};
