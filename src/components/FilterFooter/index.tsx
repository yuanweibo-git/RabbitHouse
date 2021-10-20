import React from "react";

import { Flex } from "antd-mobile";

import "./index.scss";

type Props = {
  cancelText?: string;
  okText?: string;
  onCancel?: () => void;
  onOk?: () => void;
  className?: any;
};

function FilterFooter({
  cancelText = "取消",
  okText = "确定",
  onCancel,
  onOk,
  className,
}: Props) {
  return (
    <Flex className={["root", className || ""].join(" ")}>
      {/* 取消按钮 */}

      <span className="btn cancel" onClick={onCancel}>
        {cancelText}
      </span>

      {/* 确定按钮 */}
      <span className="btn ok" onClick={onOk}>
        {okText}
      </span>
    </Flex>
  );
}

export default FilterFooter;
