import { Image, View } from "@tarojs/components"
import { styled } from "linaria/react"
import React from "react"
import defaultSrc from '@/imgs/top.png'

/**
 * 返回顶部组件
 */
export default ({ src = defaultSrc, onCallback }: {
  /** 图片路径 */
  src?: string,
  onCallback: () => void
}) => {
  return (
    <ToolView onClick={onCallback}>
      <Image className="tool-image" src={src} />
    </ToolView>
  )
}

const ToolView = styled(View)`
  padding: 10PX;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 5%;
  right: 5%;
  background-color: rgba(0, 0, 0, .2);
  box-shadow: 0PX 0PX 5PX white;
  border-radius: 50%;
  .tool-image {
    width: 45PX;
    height: 45PX;
  }
`
