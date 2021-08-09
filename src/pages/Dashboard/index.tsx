import React, { Component } from "react";
import { Carousel, Flex } from "antd-mobile";
import axios from "axios";

import "./index.scss";

import Nav1 from "../../assets/images/nav-1.png";
import Nav2 from "../../assets/images/nav-2.png";
import Nav3 from "../../assets/images/nav-3.png";
import Nav4 from "../../assets/images/nav-4.png";

import { TypeRouter } from "../../tsModels/assets";

type Swipers = {
  id: number;
  imgSrc: string;
  alt: string;
};

interface State {
  swipers: Swipers[];
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
    };
  }

  getSwiperList(): void {
    axios.get("http://localhost:9528/home/swiper").then((res) => {
      this.setState({
        swipers: res.data.body,
        isSwpiersReady: true,
      });
    });
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

  componentWillMount() {
    this.getSwiperList();
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
      </div>
    );
  }
}

export default Dashboard;
