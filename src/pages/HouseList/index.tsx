import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Flex } from "antd-mobile";
import SearchHeader from "@/components/SeachHeader";

import "./index.scss";

type Props = RouteComponentProps;

const { label } = JSON.parse(localStorage.getItem("BH_CITY") as string);

class HouseList extends Component<Props> {
  render() {
    return (
      <div className="house_list_main">
        <Flex className="page_header">
          <i className="iconfont icon-back" />
          <SearchHeader
            cityName={label}
            className="search_header"
            {...this.props}
          />
        </Flex>
      </div>
    );
  }
}

export default HouseList;
