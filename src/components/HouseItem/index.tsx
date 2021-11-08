import React, { Component } from "react";
import { BASE_URL } from "@/utils/url";
import "./index.scss";

type Props = {
  data: any;
  style?: any;
};

export default class HouseItem extends Component<Props> {
  /**
   * @description 渲染标签
   * @param tags 所有的tag标签
   */
  renderTags = (tags: string[]) => {
    return (
      <div>
        {tags.map((tag: any, index) => {
          return (
            <span className={`tag tag${index + 1}`} key={tag}>
              {tag}
            </span>
          );
        })}
      </div>
    );
  };

  render() {
    const { data, style } = this.props;
    return (
      <div className="house_item_main" style={style}>
        <div className="imgWrap">
          <img className="img" src={BASE_URL + data.houseImg} alt="" />
        </div>

        <div className="content">
          <h3 className="title">{data.title}</h3>
          <div className="desc">{data.desc}</div>

          {/*渲染标签*/}
          {this.renderTags(data.tags)}

          <div className="price">
            <span className="priceNum">{data.price}</span> 元/月
          </div>
        </div>
      </div>
    );
  }
}
