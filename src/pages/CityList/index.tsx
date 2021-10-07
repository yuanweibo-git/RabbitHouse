import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { ListRowProps } from "react-virtualized/dist/es/List";
import { RenderedRows } from "react-virtualized/dist/es/List";

import { Toast, Icon } from "antd-mobile";
import { List, AutoSizer } from "react-virtualized";
import NavHeader from "@/components/NavHeader";

import { getCityHot, getCityList } from "@/api/cityList";
import "./index.scss";
import {
  formatCityIndex,
  formatCityList,
  TITLE_HEIGHT,
  NAME_HEIGHT,
} from "./utils";

import { getCityName } from "@/api/searchHeader";

export type CityData = {
  label: string;
  pinyin: string;
  short: string;
  value: string;
};

export type CityListType = {
  [key: string]: CityData[];
};

type State = {
  cityList: CityListType;
  cityIndex: string[];
  activaIndex: number;
};

class CityList extends Component<RouteComponentProps, State> {
  private listComponent: any;

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      cityList: {},
      cityIndex: [],
      activaIndex: 0,
    };

    this.listComponent = React.createRef();
  }

  async componentDidMount() {
    await this.initCityList();

    // 计算行高度，保证在第一次渲染的时候，点击右侧导航栏跳转精度问题；
    // 需要在有List数据之后调用
    this.listComponent.measureAllRows();
  }

  /**
   * @description 通过接口获取城市数据
   * @returns void
   */
  async initCityList() {
    const {
      data: { body: allCityList },
    } = await getCityList(1);

    const { cityList, cityIndex } = formatCityList(allCityList);
    const { data } = await getCityHot();

    new BMapGL.LocalCity().get(async (res: any) => {
      const result = await getCityName(res.name);
      localStorage.setItem("CURRENT_CITY", JSON.stringify(result.data.body));
    });

    const cityInfo = JSON.parse(localStorage.getItem("CURRENT_CITY") as string);

    cityList["hot"] = data.body;
    cityList["#"] = [cityInfo];
    cityIndex.unshift("hot");
    cityIndex.unshift("#");

    this.setState({
      cityList,
      cityIndex,
    });
  }

  /**
   * @description 点击切换城市
   * @param {CityData}
   * @returns void
   */
  changeCity = ({ label, value }: CityData) => {
    const fixCityList = this.state.cityList.hot.map((item) => item.label);

    if (fixCityList.some((item) => item === label)) {
      localStorage.setItem(
        "BH_CITY",
        JSON.stringify({
          label,
          value,
        })
      );
      this.props.history.go(-1);
    } else {
      Toast.info("没有当前城市数据", 3, () => {}, false);
    }
  };

  /**
   * @description 计算每一行城市的高度
   * @param {index} 当前索引
   * @returns {number} 高度
   */
  getRowHeight = ({ index }: any): number => {
    const { cityList, cityIndex } = this.state;
    return TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT + 30;
  };

  /**
   * @description 渲染每一行的数据
   * @param {}
   * @returns JSX.Element
   */
  rowRenderer = ({ key, index, style }: ListRowProps): JSX.Element => {
    const { cityIndex, cityList } = this.state;
    const letter = cityIndex[index];
    return (
      <div className="city-item" key={key} style={style}>
        <div className="title">{formatCityIndex(letter)}</div>
        {cityList[cityIndex[index]].map((item) => {
          return (
            <div
              className="name"
              key={item.value}
              onClick={() => this.changeCity(item)}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    );
  };

  /**
   * @description 渲染右侧索引列表
   * @returns JSX.Element
   */
  renderCityIndex = (): JSX.Element[] => {
    return this.state.cityIndex.map((item, index) => (
      <li key={item} className="city-index-item">
        <span
          onClick={() => this.listComponent.scrollToRow(index)}
          className={this.state.activaIndex === index ? "index-active" : ""}
        >
          {item === "hot" ? "热" : item}
        </span>
      </li>
    ));
  };

  /**
   * @description 获取左侧渲染行的信息
   * @param {startIndex} 当前索引
   * @returns void
   */
  getRowIndex = ({ startIndex }: RenderedRows) => {
    if (this.state.activaIndex !== startIndex) {
      this.setState({
        activaIndex: startIndex,
      });
    }
  };

  render() {
    return (
      <div className="city">
        <NavHeader {...this.props} title="城市选择" />

        {this.state.cityIndex.length === 0 ? (
          <Icon className="loading" size="lg" type="loading" />
        ) : (
          ""
        )}

        {/*左侧城市列表*/}
        <AutoSizer>
          {({ width, height }) => (
            <List
              ref={(ref: any) => (this.listComponent = ref)}
              width={width}
              height={height}
              onRowsRendered={this.getRowIndex}
              rowCount={this.state.cityIndex.length}
              rowHeight={this.getRowHeight}
              rowRenderer={this.rowRenderer}
              scrollToAlignment="start"
            />
          )}
        </AutoSizer>

        {/*右侧城市索引*/}
        <ul className="city-index">{this.renderCityIndex()}</ul>
      </div>
    );
  }
}

export default CityList;
