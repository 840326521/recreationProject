import { CSSProperties } from "react";

type TypeStyle = CSSProperties | string;

export const isType = (str: any, name: string) =>
  toString.call(str).lastIndexOf(strTransformFn(name)) !== -1;

const strHandlerArray = (str: string): Array<string> => {
  return str.includes(";") ? str.split(";") : str.includes(":") ? [str] : [];
};

const strTransformFn = (str: string): string =>
  !!str ? str.replace(str[0], str[0].toUpperCase()) : "";

const strHandlerObject = (str: string): CSSProperties => {
  const cssObj: CSSProperties = {};
  if (!str) return cssObj;
  const styleArr = strHandlerArray(str);
  if (styleArr.length === 1) {
    const tempArr = styleArr[0].split(":");
    const tempNameArr =
      tempArr[0].lastIndexOf("-") !== -1 ? tempArr[0].split("-") : [tempArr[0]];
    const tempName =
      tempNameArr.length === 1
        ? tempNameArr[0]
        : tempNameArr.length === 2
        ? tempNameArr[0] + strTransformFn(tempNameArr[1])
        : "";
    !!tempName && Reflect.set(cssObj, tempName, tempArr[1].trim());
  } else if (styleArr.length > 1) {
    styleArr
      .reduce((pre: Array<[string, string]>, item) => {
        const temp = item.trim().split(":");
        pre.push([temp[0].trim(), temp[1].trim()]);
        return pre;
      }, [])
      .forEach(item => {
        let itemName = item[0];
        if (itemName.lastIndexOf("-") !== -1) {
          const itemNameArr = itemName.split("-");
          itemName = itemNameArr[0] + strTransformFn(itemNameArr[1]);
        }
        Reflect.set(cssObj, itemName, item[1]);
      });
  }
  return cssObj;
};

export const trimTitleStyleFn = (
  s1: TypeStyle,
  s2: TypeStyle = ""
): CSSProperties => {
  const assignObj: CSSProperties = {};
  if (!!s1 && isType(s1, "string") && !!s2 && isType(s2, "string")) {
    [s1, s2].forEach(item => {
      Object.assign(assignObj, strHandlerObject(item as any));
    });
  } else if ((!!s1 && isType(s1, "string")) || (!!s2 && isType(s2, "string"))) {
    if (isType(s1, "object")) {
      Object.assign(assignObj, s1);
    } else if (isType(s2, "object")) {
      Object.assign(assignObj, s2);
    }
    Object.assign(
      assignObj,
      strHandlerObject(isType(s1, "string") ? (s1 as string) : (s2 as string))
    );
  } else if (isType(s1, "object") && isType(s2, "object")) {
    Object.assign(assignObj, s1, s2);
  } else if (isType(s1, "object") || isType(s2, "object")) {
    Object.assign(assignObj, s1 ?? s2 ?? {});
  }
  return assignObj;
};
