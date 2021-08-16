import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Route } from "react-router-dom";
import { TabBar } from "antd-mobile";
import "./index.scss";

// 引入组件
import News from "../News";
import Dashboard from "../Dashboard";
import HouseList from "../HouseList";
import Profile from "../Profile";

type State = {
  selectedTab: string;
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
  state = {
    selectedTab: this.props.location.pathname,
  };

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
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        selectedTab: this.props.location.pathname,
      });
    }
  }

  render() {
    return (
      <div className="home">
        <Route exact path="/home" component={Dashboard} />
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
