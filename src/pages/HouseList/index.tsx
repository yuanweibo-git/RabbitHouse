import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Flex, Toast } from "antd-mobile";
import {
  List,
  AutoSizer,
  WindowScroller,
  InfiniteLoader,
} from "react-virtualized";

import { getHousesList } from "@/api/houseList";
import { getCurrentCity } from "@/utils";

import { ListRowProps } from "react-virtualized/dist/es/List";
import { HouseInfoItems } from "@/pages/Map";

import SearchHeader from "@/components/SeachHeader";
import Filter from "./components/Filter";
import HouseItem from "@/components/HouseItem";
import Sticky from "@/components/Sticky";
import NoHouse from "@/components/NoHouse";

import "./index.scss";

type Props = RouteComponentProps;

type State = {
  list: HouseInfoItems[];
  count: number;
  isLoading: boolean;
};

type Filters = {
  [key: string]: string;
};

class HouseList extends Component<Props, State> {
  private filters: Filters;
  private label: string;
  private value: string;

  constructor(props: Props) {
    super(props);
    this.state = {
      list: [],
      count: Number(),
      isLoading: false,
    };

    this.filters = {};
    this.label = "";
    this.value = "";
  }

  async componentDidMount() {
    const { label, value } = await getCurrentCity();
    this.label = label;
    this.value = value;
    await this.searchHouseList();
  }

  /**
   * @description 请求接口，获取筛选后的房屋数据
   */
  async searchHouseList() {
    this.setState({
      isLoading: true,
    });

    Toast.loading("加载中", 0, () => {}, true);

    const res = await getHousesList({
      cityId: this.value,
      ...this.filters,
      start: 1,
      end: 20,
    });

    Toast.hide();

    this.setState({
      list: res.data.body.list,
      count: res.data.body.count,
      isLoading: false,
    });

    res.data.body.count !== 0 &&
      Toast.info("查找到" + res.data.body.count + "套房源", 2, () => {}, false);
  }

  /**
   * @description 接收子组件传来的筛选条件
   * @param filters
   */
  onFilter = (filters: Filters) => {
    this.filters = filters;

    this.searchHouseList();
  };

  /**
   * @description 渲染房屋列表数据
   * @returns JSX.Element
   */
  renderHouseList = ({ key, index, style }: ListRowProps): JSX.Element => {
    const item = this.state.list[index];
    if (index === this.state.list.length - 1) {
      return (
        <div key={key} style={style} className="load_done">
          加载完成
        </div>
      );
    }

    if (!item) {
      return (
        <div key={key} style={style}>
          <p className="item_loading" />
        </div>
      );
    }

    return <HouseItem key={key} data={item} style={style} />;
  };

  /**
   * @description InfiniteLoader所需参数，判断是否需要加载数据
   * @returns boolean
   */
  isRowLoaded = ({ index }: any): boolean => {
    return !!this.state.list[index];
  };

  /**
   * @description InfiniteLoader所需参数，加载数据
   */
  loadMoreRows = ({ startIndex, stopIndex }: { [key in string]: number }) => {
    return new Promise<void>((resolve) => {
      getHousesList({
        cityId: this.value,
        ...this.filters,
        start: startIndex,
        end: stopIndex,
      }).then((res) => {
        this.setState({
          list: [...this.state.list, ...res.data.body.list],
        });
        resolve();
      });
    });
  };

  /**
   * @description 渲染全部房屋列表数据
   * @returns JSX.Element
   */
  renderContentList = () => {
    const { count, isLoading } = this.state;

    if (count === 0 && !isLoading) {
      return <NoHouse>没有找到房源，请您换个搜索条件吧~</NoHouse>;
    }

    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={count}
        minimumBatchSize={20}
      >
        {({ onRowsRendered, registerChild }) => (
          <WindowScroller>
            {({ height, isScrolling, scrollTop }) => (
              <AutoSizer>
                {({ width }) => (
                  <List
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    autoHeight
                    width={width}
                    height={height}
                    rowCount={count}
                    rowHeight={120}
                    isScrolling={isScrolling}
                    scrollTop={scrollTop}
                    rowRenderer={this.renderHouseList}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
    );
  };

  render() {
    return (
      <div className="house_list_main">
        <Flex className="page_header">
          <i
            className="iconfont icon-back"
            onClick={() => {
              this.props.history.go(-1);
            }}
          />
          <SearchHeader
            cityName={this.label}
            className="search_header"
            {...this.props}
          />
        </Flex>

        <Sticky height={40}>
          <Filter onFilter={this.onFilter} />
        </Sticky>

        <div className="house_info">{this.renderContentList()}</div>
      </div>
    );
  }
}

export default HouseList;
