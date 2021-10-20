import React from "react";

import { Flex } from "antd-mobile";

import "./index.scss";

type Props = {
  titleSelectedStatus: {
    [key: string]: boolean;
  };
  onClick: any;
};

// 条件筛选栏标题数组：
const titleList = [
  { title: "区域", type: "area" },
  { title: "方式", type: "mode" },
  { title: "租金", type: "price" },
  { title: "筛选", type: "more" },
];

export default function FilterTitle({ titleSelectedStatus, onClick }: Props) {
  return (
    <Flex align="center" className="filter_title_main">
      {titleList.map((item) => {
        const isSelect = titleSelectedStatus[item.type];
        return (
          <Flex.Item key={item.type}>
            <span
              className={["dropdown", isSelect ? " selected" : ""].join(" ")}
              onClick={() => {
                onClick(item.type);
              }}
            >
              <span>{item.title}</span>
              <i className="iconfont icon-arrow" />
            </span>
          </Flex.Item>
        );
      })}
    </Flex>
  );
}
