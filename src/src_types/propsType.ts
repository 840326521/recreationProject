import React from "react"
import type { TypeData, TypeItem } from "."

export declare namespace PropsType {
  export namespace ComponentPropsType {
    export type MenusProps = {
      /** 组件名称 */
      title?: string,
      /** 子组件 */
      children: React.ReactChild,
    }
  }

  export namespace PagesPorpsType {
    export type TypeProps = {
      isAll: boolean,
      data: TypeData,
      item: TypeItem,
      setData: Function
      skip?: Function,
    }
  }
}
