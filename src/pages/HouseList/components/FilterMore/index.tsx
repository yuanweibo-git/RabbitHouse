import React, { Component } from "react";

import FilterFooter from "@/components/FilterFooter";

import "./index.scss";

type Props = {
  data: any;
  type: string;
  onPickerClose: (type: string) => void;
  onClearMoreData: (type: string) => void;
  onSave: (type: string, value: any[]) => void;
  defaultValue: any[];
};

type State = {
  selectValues: string[];
  clearTextStatus: string;
};

export default class FilterMore extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectValues: this.props.defaultValue,
      clearTextStatus: this.props.defaultValue.length ? "清除" : "关闭",
    };
  }

  /**
   * @description 标签点击
   * @param value 当前点击标签的value
   */
  onTagClick = (value: string) => {
    const { selectValues } = this.state;

    const newSelectValues: string[] = JSON.parse(JSON.stringify(selectValues));

    const currentValue = newSelectValues.find((item) => item === value);

    if (!currentValue) {
      newSelectValues.push(value);
    } else {
      const index = newSelectValues.findIndex((item) => item === value);
      newSelectValues.splice(index, 1);
    }

    if (!newSelectValues.length) {
      this.setState({
        clearTextStatus: "关闭",
      });
    } else {
      this.setState({
        clearTextStatus: "清除",
      });
    }

    this.setState({
      selectValues: newSelectValues,
    });
  };

  /**
   * @description 点击清除按钮
   */
  onClear = () => {
    const { type, onPickerClose, onClearMoreData } = this.props;
    const { clearTextStatus } = this.state;

    if (clearTextStatus === "清除") {
      // 清除更多筛选条件中父组件的数据
      onClearMoreData(type);

      this.setState({
        selectValues: [],
        clearTextStatus: "关闭",
      });
      return;
    }

    onPickerClose(type);
  };

  /**
   * @description 渲染标签
   * @param data
   * @returns JSX
   */
  renderFilters(data: any) {
    // 高亮类名： styles.tagActive
    const { selectValues } = this.state;

    return data.map((item: any) => {
      const isSelect = selectValues.find((item1) => item1 === item.value);

      return (
        <span
          key={item.value}
          className={["tag", isSelect ? "tagActive" : ""].join(" ")}
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
    const {
      type,
      onPickerClose,
      onSave,
      data: { roomType, oriented, floor, characteristic },
    } = this.props;
    const { selectValues } = this.state;

    return (
      <div className="filter_more_main">
        {/* 遮罩层 */}
        <div
          className="mask"
          onClick={() => {
            onPickerClose(type);
          }}
        />

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
        <FilterFooter
          cancelText={this.state.clearTextStatus}
          onCancel={this.onClear}
          className="footer"
          onOk={() => {
            onSave(type, selectValues);
          }}
        />
      </div>
    );
  }
}
