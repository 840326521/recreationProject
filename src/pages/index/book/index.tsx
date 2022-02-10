import { ListBook, Model } from "@p_c";
import srcConfig from "@src_config";
import { TypeBookSection, TypeData, TypeItem } from "@src_types";
import { isType, request, skip, TaroToast } from "@utils";
import { ScrollView, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { Component } from "react";
import "./index.less";
import { Divider } from "@antmjs/vantui";
import { Tool } from "@p_c";

export default class Detail extends Component {
  state: {
    limit: number;
    top: number;
    toolShow: boolean;
    textData: TypeData;
    item: TypeItem;
    section: TypeBookSection;
  }
  constructor(props: any) {
    super(props);
    this.state = {
      limit: 0,
      top: 0,
      toolShow: false,
      item: {
        id: "",
        book_type: "",
        book_id: "",
        book_name: "",
        book_author: "",
        book_size: "",
        book_img: "",
        book_intro: ""
      },
      textData: {
        text: "",
        isShow: false
      },
      section: {
        count: 0,
        book_type_id: '',
        section_list: []
      }
    }
  }

  async requestFn() {
    const {
      limit,
      item: {
        book_id,
      },
      section: {
        section_list
      }
    } = this.state
    const { data: { count, book_type_id, section_list: list }
    } = await request<TypeBookSection>({
      url: "book/getBookSectionList",
      method: "post",
      data: {
        book_id,
        start: limit,
        end: limit + 20
      }
    })
    if (count === 0) {
      TaroToast({
        title: '暂无此小说资源',
        success() {
          setTimeout(() => {
            skip({
              url: "pages/index",
              way: "switchTab"
            })
          }, 3000)
        }
      })
    } else {
      this.setState({
        section: {
          count,
          book_type_id,
          section_list: section_list.concat(list)
        },
        textData: {
          text: this.state.item.book_intro
        }
      });
    }
  }

  async componentWillMount() {
    let item = Taro.getStorageSync("item")
    if (!isType(item, "object") && srcConfig.globalData.isWeb)
      return skip({
        url: "pages/index",
        way: "switchTab"
      });
    this.setState({
      item: item.banner
        ? { id: item.id, book_type: item.book_type, ...item.banner }
        : item
    }, () => {
      Taro.setNavigationBarTitle({
        title: `${this.state.item.book_type}  《${this.state.item.book_name}》`
      });
      this.requestFn()
    })
  }

  onScroll({ detail: { scrollTop: top } }) {
    const { toolShow } = this.state
    if (top >= 300 && !toolShow) {
      this.setState({
        toolShow: true
      })
    } else if (top <= 300 && toolShow) {
      this.setState({
        toolShow: false
      })
    }
  }

  onScrollToLower() {
    const { section: { count, section_list: list } } = this.state;
    if (list.length < count) {
      this.setState({ limit: this.state.limit + 20 }, this.requestFn)
    }
  }

  setData(status: boolean) {
    this.setState({
      ...this.state,
      textData: { isShow: status }
    })
  }

  render() {
    const { toolShow, top, textData, item, section: { section_list: list, count, book_type_id } } = this.state
    const scrollStyle = {
      height: '95vh'
    }
    return (
      <ScrollView
        id="scrollView"
        scrollY
        scrollWithAnimation
        scrollTop={top}
        style={scrollStyle}
        lowerThreshold={200}
        onScroll={this.onScroll.bind(this)}
        onScrollToLower={this.onScrollToLower.bind(this)}
      >
        <ListBook
          data={textData}
          item={item}
          isAll={true}
          setData={this.setData.bind(this, true)}
        />
        <View className="section-title">共{count}章</View>
        <View className="section-list">
          {list.map(
            ({ section_id: id, section_name: name }) => (
              <View
                className="section-list-item"
                key={id}
                onClick={() =>
                  skip({
                    url: "pages/index/detail",
                    way: "navigateTo",
                    data: {
                      section_id: id,
                      book_type_id,
                      book_name: item.book_name,
                      section_name: name,
                      book_id: item.book_id
                    },
                    dataName: 'detail'
                  })
                }
              >
                {name}
              </View>
            )
          )}
        </View>
        {list.length >= count && toolShow ?
          < Divider
            contentPosition="center"
            style="color: #1989fa; border-color: #1989fa; font-size: 16PX;padding: 0 20PX;margin: 10PX 0;"
          >
            没有更多了
          </Divider> : null}
        <Model
          text={item.book_intro}
          isShow={textData.isShow}
          onClose={this.setData.bind(this, false)}
        />
        {toolShow ? <Tool onCallback={() => {
          this.setState({
            top: Math.random()
          })
        }} /> : null}
      </ScrollView >
    )
  }
}
