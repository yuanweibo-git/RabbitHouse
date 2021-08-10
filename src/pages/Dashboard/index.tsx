import React, { Component } from "react";
import { Carousel, Flex, Grid } from "antd-mobile";

import "./index.scss";
import { getSwipers, getGroups } from "@/api/dashboard";

import Nav1 from "@/assets/images/nav-1.png";
import Nav2 from "@/assets/images/nav-2.png";
import Nav3 from "@/assets/images/nav-3.png";
import Nav4 from "@/assets/images/nav-4.png";

import { TypeRouter } from "@/tsModels/assets";

type Swipers = {
  id: number;
  imgSrc: string;
  alt: string;
};

type Groups = {
  desc: string;
  id: number;
  imgSrc: string;
  title: string;
};

interface State {
  swipers: Swipers[];
  groups: Groups[];
  isSwpiersReady: boolean;
}

interface Navs {
  id: number;
  img: string;
  title: string;
  path: string;
}

const navs: Navs[] = [
  {
    id: 1,
    img: Nav1,
    title: "整租",
    path: "/home/list",
  },
  {
    id: 2,
    img: Nav2,
    title: "合租",
    path: "/home/list",
  },
  {
    id: 3,
    img: Nav3,
    title: "地图找房",
    path: "/map",
  },
  {
    id: 4,
    img: Nav4,
    title: "去出租",
    path: "/rent",
  },
];

class Dashboard extends Component<TypeRouter, State> {
  constructor(props: TypeRouter) {
    super(props);
    this.state = {
      swipers: [],
      isSwpiersReady: false,
      groups: [],
    };
  }

  /**
   * @description 渲染轮播图
   * @returns {JSX.Element}
   */
  renderSwipers() {
    return this.state.swipers.map((item) => (
      <div className="swiper" key={item.id}>
        <img src={`http://localhost:9528${item.imgSrc}`} alt={item.alt} />
      </div>
    ));
  }

  /**
   * @description 渲染首页Nav菜单
   * @returns {JSX.Element}
   */
  renderNavs() {
    return navs.map((item) => (
      <Flex.Item
        key={item.id}
        onClick={() => this.props.history.push(item.path)}
      >
        <img src={item.img} alt="" />
        <h2>{item.title}</h2>
      </Flex.Item>
    ));
  }

  async componentWillMount() {
    const swipers = await getSwipers();
    const groups = await getGroups("AREA|88cff55c-aaa4-e2e0");
    this.setState({
      swipers: swipers.data.body,
      groups: groups.data.body,
      isSwpiersReady: true,
    });
  }

  render() {
    return (
      <div className="dashboard">
        {/*轮播图*/}
        <div className="swiper">
          {this.state.isSwpiersReady ? (
            <Carousel autoplay infinite>
              {this.renderSwipers()}
            </Carousel>
          ) : (
            ""
          )}
        </div>

        {/*nav菜单*/}
        <div className="nav">
          <Flex className="nav">{this.renderNavs()}</Flex>
        </div>

        {/*租房小组*/}
        <div className="groups">
          <h3>
            租房小组 <span>更多</span>
          </h3>
          <Grid
            data={this.state.groups}
            columnNum={2}
            square={false}
            renderItem={(item: Groups) => {
              return <Flex className="groups-item">123</Flex>;
            }}
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;
