import "./index.less";
import React, { useRef, useState } from "react";
import {
  Swiper,
  SwiperItem,
  View,
} from "@tarojs/components";
import { request, skip } from "@utils";
import { TypeBannerItem, TypeBookList, TypeData } from "@src_types";
import { numberFn } from "@utils";
import { Search } from "@antmjs/vantui";
import { ListBook, Model, Tabs } from "@p_c";
import Taro, { useDidShow, useReady } from "@tarojs/taro";

export default () => {
  const [bookList, setBookArr] = useState<TypeBookList>({
    bookTypeList: [],
    bannerArr: []
  });
  const viewRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<TypeData>({
    text: "",
    isShow: false,
  });

  useReady(() => {
    request<TypeBookList>({
      url: "book/getBookList"
    }).then(res => {
      const { bannerArr, bookTypeList } = res.data;
      setBookArr({
        bookTypeList,
        bannerArr: bannerArr.map(item => {
          const {
            banner: { book_size, book_intro: intro }
          } = item;
          const size = numberFn(book_size)
          return {
            ...item,
            banner: {
              ...item.banner,
              book_intro: intro.replace(/内容简介：/, "").trim(),
              book_size: size.length > 0 ? `约${size}字` : ""
            }
          };
        })
      });
      setData({
        ...data,
        text: bannerArr[0].banner.book_intro.replace(/内容简介：/, "").trim()
      });
    });
  });

  /**
   * 每次滑动时设置要展示的简介内容
   * @param param0 获取当前 Swiper 滑块中的下标
   */
  const handlerOnChange = ({ detail: { current: i } }) => {
    setData({ ...data, text: bookList?.bannerArr[i].banner.book_intro ?? "" });
  };

  useDidShow(() => {
    if (Taro.getStorageSync('item')) Taro.removeStorageSync('item')
  })

  return (
    <View ref={viewRef}>
      <Search
        shape="round"
        placeholder="请输入小说书名关键词"
        className="search"
        disabled
        renderAction={
          <View style={{ fontSize: '18PX' }} onClick={console.log}>
            搜索
          </View>
        }
      />
      <Swiper
        indicatorDots={true}
        style="height: 230PX"
        onChange={handlerOnChange}
      >
        {bookList?.bannerArr.map(item => {
          const {
            banner: {
              book_id,
            }
          } = item;
          return (
            <SwiperItem key={book_id}>
              <ListBook
                item={{ id: item.id, book_type: item.book_type, ...item.banner }}
                data={data} setData={setData}
                skip={() => skip<TypeBannerItem>({
                  url: 'pages/index/book',
                  way: 'navigateTo',
                  data: item
                })}
                isAll={false}
              />
            </SwiperItem>
          );
        })}
      </Swiper>
      <Tabs
        list={bookList.bookTypeList}
        titleStyle={{ backgroundColor: 'white', boxShadow: '0px 12px 8px -12px #000' }}
        nameObj={{ titleName: 'title_name', contentName: 'list' }}
        onModel={val => setData({ ...data, text: val, isShow: true })}
      />
      <Model {...data} onClose={setData.bind(null, { ...data, isShow: false })} />
    </View>
  );
};
