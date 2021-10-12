import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import { Icon, Toast } from "antd-mobile";
import { BASE_URL } from "@/utils/url";

import NavHeader from "@/components/NavHeader";

import "./index.scss";

import { getHouseList, getHouseInfo } from "@/api/map";

type HouseItems = {
  coord: { latitude: number; longitude: number };
  count: number;
  label: string;
  value: string;
};

type HouseInfoItems = {
  desc: string;
  houseCode: string;
  houseImg: string;
  price: number;
  title: string;
  tags: string[];
};

type Props = RouteComponentProps & {};

type State = {
  houseInfoList: HouseInfoItems[];
  isShowHouseList: boolean;
};

const labelStyle: { [key: string]: string } = {
  cursor: "pointer",
  border: "0px solid rgb(255, 0, 0)",
  padding: "0px",
  whiteSpace: "nowrap",
  fontSize: "12px",
  color: "rgb(255, 255, 255)",
  textAlign: "center",
};

class MapBox extends React.Component<Props, State> {
  private map: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      houseInfoList: [],
      isShowHouseList: false,
    };
  }

  async componentDidMount() {
    this.initMap();
  }

  initMap() {
    const { label, value } = JSON.parse(
      localStorage.getItem("BH_CITY") as string
    );

    // 初始化地图
    this.map = new BMapGL.Map("container");

    // 创建地址解析器实例
    const myGeo = new BMapGL.Geocoder();
    myGeo.getPoint(
      label,
      async (point) => {
        if (point) {
          //  初始化地图
          this.map.centerAndZoom(point, 11);

          // 比例尺控件
          this.map.addControl(new BMapGL.ScaleControl());
          // 缩放控件
          this.map.addControl(new BMapGL.ZoomControl());

          // 调用 renderOverlays 方法
          await this.renderOverlays(value);
        }
      },
      label
    );

    // 给地图绑定移动事件
    this.map.addEventListener("movestart", () => {
      if (this.state.isShowHouseList) {
        this.setState({
          isShowHouseList: false,
        });
      }
    });
  }

  /**
   * @description 加载覆盖物信息
   * @param id
   * @returns null
   */
  async renderOverlays(id: string) {
    try {
      Toast.loading("加载中", 0, () => {}, true);

      const {
        data: { body: houseList },
      } = await getHouseList(id);

      const { nextZoom, type } = this.getTypeAndZoom();

      houseList.reverse().forEach((item: HouseItems) => {
        this.createOverlays(item, nextZoom, type);
      });

      Toast.hide();
    } catch (e) {
      Toast.hide();
    }
  }

  /**
   * @description 获取缩放比例并设置类型
   * @returns {nextZoom, type}
   */
  getTypeAndZoom() {
    const zoom = this.map.getZoom();

    let nextZoom: number = zoom,
      type: string = "circle";

    // 判断地图缩放级别
    if (zoom >= 10 && zoom < 12) {
      nextZoom = 13;
      type = "circle";
    } else if (zoom >= 12 && zoom < 14) {
      nextZoom = 15;
      type = "circle";
    } else if (zoom >= 14 && zoom < 16) {
      type = "rect";
    }

    return {
      nextZoom,
      type,
    };
  }

  /**
   * @description 判断渲染哪种类型数据
   * @param data
   * @param zoom
   * @param type
   */
  createOverlays(data: HouseItems, zoom: number, type: string): void {
    const {
      coord: { longitude, latitude },
      label: areaName,
      count,
      value,
    } = data;

    const point = new BMapGL.Point(longitude, latitude);

    if (type === "circle") {
      this.createCircle(point, areaName, count, value, zoom);
    } else {
      this.createRect(point, areaName, count, value);
    }
  }

  /**
   * @description 渲染圆形覆盖物
   * @param point
   * @param areaName
   * @param count
   * @param value
   * @param zoom
   */
  createCircle(
    point: BMapGL.Point,
    areaName: string,
    count: number,
    value: string,
    zoom: number
  ) {
    const label: BMapGL.Label = new BMapGL.Label("", {
      position: point,
      offset: new BMapGL.Size(-35, -35),
    });

    label.id = value;

    // 设置覆盖物结构
    label.setContent(`
            <div class="bubble">
              <p class="name">${areaName}</p>
              <p>${count}套</p>
            </div>
          `);

    // 设置覆盖物样式
    label.setStyle(labelStyle);

    // 添加单击事件
    label.addEventListener("click", () => {
      this.renderOverlays(value);
      this.map.centerAndZoom(point, zoom);

      // 清除当前覆盖物信息
      this.map.clearOverlays();
    });

    this.map.addOverlay(label);
  }

  /**
   * @description 渲染方形覆盖物
   * @param point
   * @param areaName
   * @param count
   * @param value
   */
  createRect(
    point: BMapGL.Point,
    areaName: string,
    count: number,
    value: string
  ) {
    const label: BMapGL.Label = new BMapGL.Label("", {
      position: point,
      offset: new BMapGL.Size(-50, -35),
    });

    label.id = value;

    // 设置覆盖物结构
    label.setContent(`
           <div class="rect">
              <span class="housename">${areaName}</span>
              <span class="housenum">${count}套</span>
              <i class="arrow"></i>
          </div>
        `);

    // 设置覆盖物样式
    label.setStyle(labelStyle);

    // 添加单击事件
    label.addEventListener("click", async (e) => {
      const { clientX, clientY } = e.domEvent.changedTouches[0];

      this.map.panBy(
        window.innerWidth / 2 - clientX,
        (window.innerHeight - 310) / 2 - clientY
      );

      e.currentTarget.domElement.children[0].className += " move_rect";

      setTimeout(() => {
        e.currentTarget.domElement.children[0].className = "rect";
      }, 1000);

      // 获取小区房屋详情
      await this.getHouseInfo(value);

      // this.map.centerAndZoom(point, 15);
    });

    this.map.addOverlay(label);
  }

  /**
   * @description 获取房源详情
   * @param id
   */
  async getHouseInfo(id: string) {
    try {
      Toast.loading("加载中", 0, () => {}, true);

      const { data } = await getHouseInfo(id);

      this.setState(() => ({
        houseInfoList: data.body.list,
        isShowHouseList: true,
      }));

      Toast.hide();
    } catch (e) {
      Toast.hide();
    }
  }

  render() {
    return (
      <div className="map">
        <NavHeader {...this.props} title="地图找房" />
        <div id="container" />

        {/*房源详情弹出层*/}
        <div
          className={[
            "house_info",
            this.state.isShowHouseList ? "show_house_info" : "",
          ].join(" ")}
        >
          {/*标题栏*/}
          <div className="title_wrapper">
            <h1 className="list">房屋列表</h1>
            <Link className="more" to="/home/list">
              更多房源
              <Icon type="right" />
            </Link>
          </div>

          {/*内容详情*/}
          <div className="houseItems">
            {/* 房屋结构 */}
            {this.state.houseInfoList.map((item) => (
              <div className="house" key={item.houseCode}>
                <div className="imgWrap">
                  <img className="img" src={BASE_URL + item.houseImg} alt="" />
                </div>
                <div className="content">
                  <h3 className="title">{item.title}</h3>
                  <div className="desc">{item.desc}</div>
                  <div>
                    {item.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="price">
                    <span className="priceNum">{item.price}</span> 元/月
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default MapBox;
