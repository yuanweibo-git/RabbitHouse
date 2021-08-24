import React from "react";

import { NavBar } from "antd-mobile";
import "./index.scss";

import { RouteComponentProps } from "react-router-dom";

type Props = RouteComponentProps & {
  onLeftClick?: (params: any) => void;
  title: string;
};

function NavHeader(props: Props) {
  const defaultHandle = () => props.history.go(-1);

  return (
    <NavBar
      className="navbar"
      mode="light"
      icon={<i className="iconfont icon-back" />}
      onLeftClick={props.onLeftClick || defaultHandle}
    >
      {props.title}
    </NavBar>
  );
}

export default NavHeader;
