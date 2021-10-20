import React, { Component } from "react";

import FilterFooter from "@/components/FilterFooter";

import "./index.scss";

type Props = {
  data: any;
};

type State = {
  selectValues: boolean[];
};

export default class FilterMore extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectValues: [],
    };
  }

  /**
   * @description 标签点击
   * @param value 当前点击标签的value
   */
  onTagClick = (value: string) => {
    console.log(value);
  };

  /**
   * @description 渲染标签
   * @param data
   * @returns JSX
   */
  renderFilters(data: any) {
    // 高亮类名： styles.tagActive

    return data.map((item: any) => {
      console.log(item);

      return (
        <span
          key={item.value}
          className={["tag"].join(" ")}
          onClick={() => {
            this.onTagClick(item.value);
          }}
        >
          {item.label}
        </span>
      );
    });
  }

  render() {
    const { roomType, oriented, floor, characteristic } = this.props.data;

    return (
      <div className="filter_more_main">
        {/* 遮罩层 */}
        <div className="mask" />

        {/* 条件内容 */}
        <div className="tags">
          <dl className="dl">
            <dt className="dt">户型</dt>
            <dd className="dd">{this.renderFilters(roomType)}</dd>

            <dt className="dt">朝向</dt>
            <dd className="dd">{this.renderFilters(oriented)}</dd>

            <dt className="dt">楼层</dt>
            <dd className="dd">{this.renderFilters(floor)}</dd>

            <dt className="dt">房屋亮点</dt>
            <dd className="dd">{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter className="footer" />
      </div>
    );
  }
}
