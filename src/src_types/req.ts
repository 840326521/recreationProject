import { Dispatch } from "react";
import { Method } from "taro-axios";

export type Option = {
  url: string;
  method?: Method;
};

export type ReturnType<D> = [D, Dispatch<D>];
