import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Flex } from "antd-mobile";

import "./index.scss";

type Props = RouteComponentProps & {
  cityName: string;
  className?: string;
};

export class SearchHeader extends React.Component<Props> {
  render() {
    return (
      <Flex
        className={["search", this.props.className || ""].join(" ")}
        justify="between"
      >
        {/*左侧白底*/}
        <div className="content-wrapper">
          {/*地区*/}
          <div
            className="location"
            onClick={() => this.props.history.push("/city-list")}
          >
            <span>{this.props.cityName}</span>
            <i className="iconfont icon-arrow" />
          </div>

          {/*搜索框*/}
          <Flex
            className="search-content"
            onClick={() => this.props.history.push("/search")}
          >
            <i className="iconfont icon-seach" />
            <span>请输入小区或地址</span>
          </Flex>
        </div>

        {/*右侧icon*/}
        <i
          className="iconfont icon-map"
          onClick={() => this.props.history.push("/map")}
        />
      </Flex>
    );
  }
}

export default SearchHeader;
