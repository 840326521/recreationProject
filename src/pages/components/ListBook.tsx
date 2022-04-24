import React from "react";
import { PropsType } from "@src_types";
import { View, Image, Text, Button } from "@tarojs/components";
import { Divider } from "@antmjs/vantui";
import { styled } from "linaria/react";
import config from "@src_config";

export default (props: PropsType.PagesPorpsType.TypeProps) => {
  const { item, skip, setData, data, isAll } = props;
  const {
    book_type,
    book_img,
    book_name,
    book_size,
    book_author,
    book_intro
  } = item;

  return (
    <StyledView
      style={`${
        !isAll
          ? `background-image: url(${config.url + book_img}); color: white;`
          : ""
      }`}
    >
      {!isAll && <View className="swiper-view-shade" />}
      <View className="swiper-view-conent">
        <Image className="swiper-view-img" src={config.url + book_img} />
        <View className="swiper-view-content" onClick={skip?.bind(null)}>
          <View className="swiper-view-content-item">
            <Text className="swiper-view-content-item-title">小说名：</Text>
            <Text>《{book_name}》</Text>
          </View>
          <View className="swiper-view-content-item">
            <Text className="swiper-view-content-item-title">作者：</Text>
            <Text>{book_author}</Text>
          </View>
          <View className="swiper-view-content-item">
            <Text className="swiper-view-content-item-title">小说类型：</Text>
            <Text>{book_type}</Text>
          </View>
          <View className="swiper-view-content-item">
            <Text className="swiper-view-content-item-title">文字总数：</Text>
            <Text>{book_size}</Text>
          </View>
        </View>
      </View>
      {book_intro.length > 0 && (
        <View className="swiper-view-text">
          <Divider
            textColor="#4F6EF2"
            contentPosition="center"
            style="margin: 15PX 0 10PX;height: 24PX;padding: 0 10PX;font-size: 18PX;"
          >
            简介
          </Divider>
          <View
            className="swiper-view-omit"
            style={`${isAll ? "padding: 0 15PX;text-indent: 2.2em;" : ""}`}
            // dangerouslySetInnerHTML={{ __html: book_intro }}
          >
            {book_intro}
          </View>
          {book_intro.length > 20 && (
            <Button
              size="mini"
              plain={true}
              className="swiper-view-btn"
              style={`color: ${!isAll ? "white" : "black"}`}
              onClick={setData?.bind(null, { ...data, isShow: true })}
            >
              查看简介
            </Button>
          )}
        </View>
      )}
    </StyledView>
  );
};

const StyledView = styled(View)`
  height: 240px;
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 16px;
  .swiper-view-shade {
    width: 100%;
    height: 105%;
    background-color: red;
    position: absolute;
    top: -10px;
    z-index: 0;
    backdrop-filter: blur(4px);
    background-color: rgba(40, 44, 52, 0.5);
  }
  .swiper-view-conent {
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: absolute;
    z-index: 1;
    .swiper-view-img {
      display: inherit;
      justify-content: center;
      align-items: center;
      width: 20%;
      height: 80%;
      box-sizing: border-box;
    }
    .swiper-view-content {
      width: 70%;
      display: inherit;
      flex-direction: column;
      .swiper-view-content-item {
        width: 100%;
        display: inherit;
        .swiper-view-content-item-title {
          width: 80px;
          text-align: right;
          margin-right: 5px;
        }
      }
    }
  }
  .swiper-view-text {
    width: 100%;
    height: 25%;
    position: absolute;
    bottom: 60px;
    z-index: 1;
    .swiper-view-omit {
      text-indent: 40px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .swiper-view-btn {
      border: none;
      z-index: 100;
    }
  }
`;
