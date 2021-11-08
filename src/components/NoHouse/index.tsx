import React from "react";
import { BASE_URL } from "@/utils/url";
import "./index.scss";

type Props = {
  children: string;
};

const NoHouse = (props: Props) => (
  <div className="no-house-main">
    <img className="img" src={BASE_URL + "/img/not-found.png"} alt="暂无数据" />
    <p className="msg">{props.children}</p>
  </div>
);

export default NoHouse;
