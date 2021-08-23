import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Route } from "react-router-dom";
import { TabBar } from "antd-mobile";
import "./index.scss";
import { Map } from "react-bmapgl";
// 引入组件
import News from "../News";
import Dashboard from "../Dashboard";
import HouseList from "../HouseList";
import Profile from "../Profile";
import { getCityName } from "@/api/searchHeader";

type State = {
  selectedTab: string;
  isCityReady: boolean;
  lng: number;
  lat: number;
};

interface tabList {
  title: string;
  icon: string;
  path: string;
}

const tabItems: tabList[] = [
  {
    title: "首页",
    icon: "icon-ind",
    path: "/home",
  },
  {
    title: "找房",
    icon: "icon-findHouse",
    path: "/home/list",
  },
  {
    title: "资讯",
    icon: "icon-infom",
    path: "/home/news",
  },
  {
    title: "我的",
    icon: "icon-my",
    path: "/home/profile",
  },
];

class Home extends Component<RouteComponentProps, State> {
  private mapRefs: any;

  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      selectedTab: this.props.location.pathname,
      isCityReady: false,
      lng: 0,
      lat: 0,
    };

    this.mapRefs = React.createRef();
  }

  async componentDidMount() {
    // 获取当前地理位置
    await navigator.geolocation.getCurrentPosition((position) => {
      const {
        coords: { longitude, latitude },
      } = position;

      this.setState({
        lng: longitude,
        lat: latitude,
      });
    });

    // 获取当前城市
    const { cityName } = this.mapRefs.map;

    getCityName(cityName).then((res) => {
      const {
        data: { body },
      } = res;

      localStorage.setItem("BH_CITY", JSON.stringify(body));

      this.setState({
        isCityReady: true,
      });
    });
  }

  /**
   * @description 渲染TabBar
   * @returns {JSX.Element} ReactDom
   */
  renderTabBarItem() {
    return tabItems.map((item, index) => (
      <TabBar.Item
        title={item.title}
        key={index}
        icon={<i className={`iconfont ${item.icon}`} />}
        selectedIcon={<i className={`iconfont ${item.icon}`} />}
        selected={this.state.selectedTab === item.path}
        onPress={() => {
          this.setState({ selectedTab: item.path });
          this.props.history.push(item.path);
        }}
      />
    ));
  }

  componentDidUpdate(
    prevProps: Readonly<RouteComponentProps>,
    prevState: Readonly<State>,
    snapshot?: any
  ) {
    // 修复TabBar切换页面不改变状态
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        selectedTab: this.props.location.pathname,
      });
    }
  }

  render() {
    return (
      <div className="home">
        <Map
          ref={(ref: any) => {
            this.mapRefs = ref;
          }}
          style={{ height: 0 }}
          center={new BMapGL.Point(this.state.lng, this.state.lat)}
          zoom={0}
        />

        {this.state.isCityReady ? (
          <Route exact path="/home" component={Dashboard} />
        ) : (
          ""
        )}
        <Route path="/home/list" component={HouseList} />
        <Route path="/home/news" component={News} />
        <Route path="/home/profile" component={Profile} />

        <TabBar
          unselectedTintColor="#888"
          tintColor="#0a0"
          barTintColor="white"
        >
          {this.renderTabBarItem()}
        </TabBar>
      </div>
    );
  }
}

export default Home;
