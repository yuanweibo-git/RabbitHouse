import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Flex } from "antd-mobile";

import { getCityName } from "@/api/searchHeader";

import "./index.scss";

type Props = RouteComponentProps & {
  map: any;
  getAreaId: (data: string) => void;
};

type State = {
  label: string;
};

export class SearchHeader extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      label: "",
    };
  }

  async componentDidMount() {
    const { data } = await getCityName(this.props.map.cityName);
    const { label, value } = data.body;
    this.props.getAreaId(value);
    this.setState({ label });
  }

  render() {
    return (
      <Flex className="search" justify="between">
        {/*左侧白底*/}
        <div className="content-wrapper">
          {/*地区*/}
          <div
            className="location"
            onClick={() => this.props.history.push("city-list")}
          >
            <span>{this.state.label}</span>
            <i className="iconfont icon-arrow" />
          </div>

          {/*搜索框*/}
          <Flex
            className="search-content"
            onClick={() => this.props.history.push("search")}
          >
            <i className="iconfont icon-seach" />
            <span>请输入小区或地址</span>
          </Flex>
        </div>

        {/*右侧icon*/}
        <i
          className="iconfont icon-map"
          onClick={() => this.props.history.push("map")}
        />
      </Flex>
    );
  }
}

export default SearchHeader;
