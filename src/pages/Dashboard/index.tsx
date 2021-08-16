import React, { Component } from "react";
import { Carousel, Flex, Grid, WingBlank } from "antd-mobile";
import { RouteComponentProps } from "react-router-dom";
import { Map } from "react-bmapgl";
import { MapProps } from "react-bmapgl/Map";
import { getSwipers, getGroups, getNews } from "@/api/dashboard";

import SearchHeader from "@/components/SeachHeader";

import Nav1 from "@/assets/images/nav-1.png";
import Nav2 from "@/assets/images/nav-2.png";
import Nav3 from "@/assets/images/nav-3.png";
import Nav4 from "@/assets/images/nav-4.png";
import "./index.scss";

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

type News = {
  date: string;
  from: string;
  id: number;
  imgSrc: string;
  title: string;
};

type Props = RouteComponentProps & {
  map: MapProps;
};

interface State {
  swipers: Swipers[];
  groups: Groups[];
  news: News[];
  isSwpiersReady: boolean;
  lng: number;
  lat: number;
  areaId: string;
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

class Dashboard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      swipers: [],
      news: [],
      isSwpiersReady: false,
      groups: [],
      lng: 116.404449,
      lat: 39.914889,
      areaId: "",
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

  /**
   * @description 渲染资讯
   * @returns {JSX.Element}
   */
  renderNews() {
    return this.state.news.map((item) => (
      <div key={item.id} className="news-wrapper">
        <img src={`http://localhost:9528${item.imgSrc}`} alt="" />
        <div className="news-text">
          <Flex className="content" direction="column" justify="between">
            <h3 className="title">{item.title}</h3>
            <Flex className="context" justify="between">
              <span>{item.from}</span>
              <span>{item.date}</span>
            </Flex>
          </Flex>
        </div>
      </div>
    ));
  }

  /**
   * @description 获取地区ID callBack
   * @param data 地区ID
   * @returns void
   */
  getAreaId = (data: string) => {
    this.setState({ areaId: data });
  };

  async componentWillMount() {
    // 获取当前地理位置
    navigator.geolocation.getCurrentPosition((position) => {
      const {
        coords: { longitude, latitude },
      } = position;

      this.setState({
        lng: longitude,
        lat: latitude,
      });
    });

    const swipers = await getSwipers();
    const groups = await getGroups(this.state.areaId);
    const news = await getNews(this.state.areaId);

    this.setState({
      swipers: swipers.data.body,
      groups: groups.data.body,
      news: news.data.body,
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

          <Map
            style={{ height: "0" }}
            center={new BMapGL.Point(this.state.lng, this.state.lat)}
            zoom={0}
          >
            <SearchHeader {...this.props} getAreaId={this.getAreaId} />
          </Map>
        </div>

        {/*nav菜单*/}
        <div className="nav">
          <Flex className="nav">{this.renderNavs()}</Flex>
        </div>

        {/*租房小组*/}
        <div className="groups" onContextMenu={(e) => e.preventDefault()}>
          <h3 className="group-title">
            租房小组
            <span className="more">更多</span>
          </h3>
          <Grid
            data={this.state.groups}
            columnNum={2}
            square={false}
            hasLine={false}
            renderItem={(item) => {
              return (
                <Flex className="group-item" justify="around" key={item?.id}>
                  <div className="desc">
                    <p className="title">{item?.title}</p>
                    <span className="info">{item?.desc}</span>
                  </div>
                  <img src={`http://localhost:9528${item?.imgSrc}`} alt="" />
                </Flex>
              );
            }}
          />
        </div>

        {/*最新资讯*/}
        <div className="news">
          <h3>最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
      </div>
    );
  }
}

export default Dashboard;
