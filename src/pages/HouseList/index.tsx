import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Flex } from "antd-mobile";

import SearchHeader from "@/components/SeachHeader";
import Filter from "./components/Filter";

import "./index.scss";

type Props = RouteComponentProps;

const { label: cityName } = JSON.parse(
  localStorage.getItem("BH_CITY") as string
);

class HouseList extends Component<Props> {
  render() {
    return (
      <div className="house_list_main">
        <Flex className="page_header">
          <i className="iconfont icon-back" />
          <SearchHeader
            cityName={cityName}
            className="search_header"
            {...this.props}
          />
        </Flex>

        <Filter />
      </div>
    );
  }
}

export default HouseList;
