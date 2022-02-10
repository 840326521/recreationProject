import "./index.less"
import { TypeDetailData } from "@/src_types"
import { request, skip, throttle } from "@utils"
import { ScrollView, View, Text } from "@tarojs/components"
import Taro, { useReady } from "@tarojs/taro"
import React, { useCallback, useState } from "react"
import { ActionSheet, Button, Slider } from "@antmjs/vantui"

type CurrentTypeDetailData = { detail: TypeDetailData.Detail, section: TypeDetailData.Section }
type TypeSetStyleFnProperty = { objName: "global" | "text", property: string, idx: number, i: number }



export default () => {
  const typefaceObj = {
    "雅黑": "'Microsoft YaHei',PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light',sans-serif",
    "宋体": "PingFangSC-Regular,'-apple-system',Simsun",
    "楷书": "Kaiti"
  }
  const panelArr: Array<Array<string>> = [
    ["雅黑", "宋体", "楷书"],
    ["#000", "#DCCC9E", "#CFE1CF", "#D1E0E4", "#4B3535", "#CFCFCF", "#0E0F11"],
    ["#FFF", "#1A73E8", "#B0D2E9", "#C66834", "#A4F019", "#CAD2D9", "#DF9538"]
  ]
  const [idxArr, setIdxArr] = useState<Array<any>>([0, 0, 0])
  const [styleData, setStyleData] = useState<TypeDetailData.StyeData>({
    globalStyle: {
      color: '#000',
      fontFamily: "'Microsoft YaHei',PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light',sans-serif",
      backgroundColor: "#FFF"
    },
    textStyle: {
      fontSize: '18PX',
      textIndent: "2em",
      marginBottom: "20PX",
    }
  })
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
  })
  const [isShow, setIsShow] = useState<boolean>(false)
  useReady(async () => {
    const detail = Taro.getStorageSync<TypeDetailData.Detail>("detail")
    if (!detail) {
      return skip({
        url: 'pages/index',
        way: 'navigateTo'
      })
    }
    const { data: section } = await request<TypeDetailData.Section>({
      url: 'book/getBookSection',
      method: 'post',
      data: {
        book_type_id: detail.book_type_id,
        book_id: detail.book_id,
        section_id: detail.section_id
      }
    })
    setDetailData({
      section,
      detail
    })
    Taro.setNavigationBarTitle({
      title: `《${detail.book_name}》  ${detail.section_name}`
    })
  })

  const setStyleFn = useCallback(({ objName, property, idx, i }: TypeSetStyleFnProperty) => {
    console.log(objName, property, idx, i)
    idxArr[idx] = i
    styleData[`${objName}Style`][property] = idx === 0 ? typefaceObj[panelArr[idx][i]] : panelArr[idx][i]
    setStyleData(styleData)
    console.log({ ...styleData })
    setIdxArr([...idxArr])
    console.log([...idxArr])
  }, [])

  return (
    < ScrollView className="scroll-view" scrollY style={styleData.globalStyle}>
      {idxArr.map(item => <Text>{item}</Text>)}
      <View className="scroll-view-title">{detailData.detail.section_name}</View>
      <View className="scroll-view-content" onClick={throttle(() => setIsShow(true), 100)}>
        {detailData.section.textArr.map((item, i) => <View style={styleData.textStyle} key={i}>{item}</View>)}
      </View>
      <ActionSheet
        className="ActionSheet"
        show={isShow}
        title="样式设置面板"
        onClose={throttle(() => setIsShow(false), 100)}
      >
        <View className="ActionSheet-content">
          <View className="ActionSheet-content-bgColor">
            <Text style="font-size: 16PX;">文字类型:</Text>
            <View className="ActionSheet-content-bgColor-c">
              {
                panelArr[0].map((item, i) =>
                  <Button
                    className="btn"
                    style={`${i === idxArr[0] ? "border: 1px solid #1CBB9A" : ""}`}
                    size="small"
                    key={item}
                    onClick={setStyleFn.bind(null, { objName: 'global', property: 'fontFamily', idx: 0, i })}
                  >
                    {item}
                  </Button>
                )
              }
            </View>
          </View>
          <View className="ActionSheet-content-bgColor">
            <Text style="font-size: 16PX; padding-right: 5%;">文字间距:</Text>
            <Slider
              min={20}
              max={60}
              step={10}
              style="width: 70%; height: 10PX; margin-right: 5%;"
              renderButton={v => <View className="radius-view">{v}</View>}
            />
          </View>
          <View className="ActionSheet-content-bgColor">
            <Text style="font-size: 16PX; padding-right: 5%;">字体大小:</Text>
            <Slider
              min={18}
              max={48}
              step={2}
              style="width: 70%; height: 10PX; margin-right: 5%;"
              renderButton={v => <View className="radius-view">{v}</View>}
            />
          </View>
          <View className="ActionSheet-content-bgColor">
            <Text style="font-size: 16PX;">文字颜色:</Text>
            <View className="ActionSheet-content-bgColor-c">
              {
                panelArr[1].map((item, i) =>
                  <View
                    className={`ActionSheet-content-bgColor-c-i ${i === idxArr[1] ? "selectend" : ""}`}
                    key={item}
                    style={{ backgroundColor: item }}
                    onClick={() => setStyleFn({ objName: 'global', property: 'color', idx: 1, i })}
                  />
                )
              }
            </View>
          </View>
          <View className="ActionSheet-content-bgColor">
            <Text style="font-size: 16PX;">背景颜色:</Text>
            <View className="ActionSheet-content-bgColor-c">
              {
                panelArr[2].map((item, i) =>
                  <View
                    className={`ActionSheet-content-bgColor-c-i ${i === idxArr[2] ? "selectend" : ""}`}
                    key={item}
                    style={{ backgroundColor: item }}
                  />
                )
              }
            </View>
          </View>
        </View>
      </ActionSheet>
    </ScrollView >
  )
}
