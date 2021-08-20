import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { NavBar } from "antd-mobile";

import { getCityHot, getCityList } from "@/api/cityList";
import "./index.scss";

type CityData = {
  label: string;
  pinyin: string;
  short: string;
  value: string;
};

type CityListType = {
  [key: string]: CityData[];
};

const formatCityList = (list: CityData[]) => {
  const cityList: CityListType = {};

  list.forEach((item) => {
    let firstStr: string = item.short.substr(0, 1).toUpperCase();

    if (!cityList[firstStr]) cityList[firstStr] = [item];
    else cityList[firstStr].push(item);
  });

  const cityIndex: string[] = Object.keys(cityList).sort();

  return {
    cityList,
    cityIndex,
  };
};

class CityList extends Component<RouteComponentProps> {
  async componentDidMount() {
    const {
      data: { body },
    } = await getCityList(1);

    const { cityList, cityIndex } = formatCityList(body);

    const { data } = await getCityHot();

    cityList["Hot"] = data.body;
    console.log(cityList, cityIndex);
  }

  render() {
    return (
      <div className="city-list">
        <NavBar
          className="navbar"
          mode="light"
          icon={<i className="iconfont icon-back" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          城市选择
        </NavBar>
      </div>
    );
  }
}

export default CityList;
