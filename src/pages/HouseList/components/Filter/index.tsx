import React, { Component } from "react";

import FilterTitle from "../FilterTitle";
import FilterPicker from "../FilterPicker";
import FilterMore from "../FilterMore";

import "./index.scss";
import { getCondition } from "@/api/houseList";

type Props = {};
type State = {
  titleSelectedStatus: TitleSelectedStatus;
  selectedValues: SelectedValues;
  openType: string;
  filtersData: any;
};

type TitleSelectedStatus = {
  [key: string]: boolean;
};
type SelectedValues = {
  [key: string]: string[];
};

// FilterTitle的选中状态
const titleSelectedStatus: TitleSelectedStatus = {
  area: false,
  mode: false,
  price: false,
  more: false,
};

// FilterPicker 和 FilterMore 组件的选中值
const selectedValues: SelectedValues = {
  area: ["area", "null"],
  mode: ["null"],
  price: ["null"],
  more: [],
};

class Filter extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      titleSelectedStatus,
      selectedValues,
      // 选中的标签
      openType: "",
      // 提供的筛选条件
      filtersData: [],
    };
  }

  componentDidMount() {
    this.getHousesCondition();
  }

  /**
   * @description 获取筛选条件
   */
  async getHousesCondition() {
    const { value } = JSON.parse(localStorage.getItem("BH_CITY") as string);
    const res = await getCondition(value);

    console.log(res.data.body);

    this.setState({
      filtersData: res.data.body,
    });
  }

  /**
   * @description 标题栏高亮状态操作
   * @param type
   * @param value
   * @returns newTitleSelectedStatus
   */
  titleSelectedStatusHandle(type: string, value?: any[]) {
    const { titleSelectedStatus, selectedValues } = this.state;

    const newTitleSelectedStatus = { ...titleSelectedStatus };

    const selectedVal = value || selectedValues[type];

    if (
      type === "area" &&
      (selectedVal.length !== 2 || selectedVal[0] !== "area")
    ) {
      newTitleSelectedStatus[type] = true;
    } else if (type === "mode" && selectedVal[0] !== "null") {
      newTitleSelectedStatus[type] = true;
    } else if (type === "price" && selectedVal[0] !== "null") {
      newTitleSelectedStatus[type] = true;
    } else {
      newTitleSelectedStatus[type] = false;
    }

    return newTitleSelectedStatus;
  }

  /**
   * @description 点击FilterTitle处理函数
   * @param type 子组件中的回调参数
   */
  onTitleClick = (type: string) => {
    const { titleSelectedStatus, selectedValues } = this.state;

    const newTitleSelectedStatus = { ...titleSelectedStatus };

    Object.keys(this.state.selectedValues).forEach((key) => {
      if (key === type) {
        newTitleSelectedStatus[type] = true;
        return;
      }

      // 获取当前标题下的选中内容
      const selectedVal = selectedValues[key];

      if (
        key === "area" &&
        (selectedVal.length !== 2 || selectedVal[0] !== "area")
      ) {
        newTitleSelectedStatus[key] = true;
      } else if (key === "mode" && selectedVal[0] !== "null") {
        newTitleSelectedStatus[key] = true;
      } else if (key === "price" && selectedVal[0] !== "null") {
        newTitleSelectedStatus[key] = true;
      } else {
        newTitleSelectedStatus[key] = false;
      }
    });

    this.setState({
      titleSelectedStatus: newTitleSelectedStatus,
      openType: type,
    });
  };

  /**
   * @description 点击关闭按钮
   */
  onPickerClose = (type: string) => {
    const newTitleSelectedStatus = this.titleSelectedStatusHandle(type);

    this.setState({
      openType: "",
      titleSelectedStatus: newTitleSelectedStatus,
    });
  };

  /**
   * @description 点击保存
   */
  onSave = (type: string, value: any[]) => {
    const newTitleSelectedStatus = this.titleSelectedStatusHandle(type, value);

    this.setState({
      openType: "",
      titleSelectedStatus: newTitleSelectedStatus,
      selectedValues: {
        ...this.state.selectedValues,
        [type]: value,
      },
    });
  };

  /**
   * @description 渲染FilterPicker组件
   */
  renderFilterPicker() {
    const {
      openType,
      filtersData: { area, subway, rentType, price },
      selectedValues,
    } = this.state;

    if (openType !== "area" && openType !== "mode" && openType !== "price") {
      return null;
    }

    // picker组件数据
    let data: any[] = [];

    // 渲染的列数
    let cols: number = 1;

    const defaultValue = selectedValues[openType];

    switch (openType) {
      case "area":
        data = [area, subway];
        cols = 3;
        break;
      case "mode":
        data = rentType;
        break;
      case "price":
        data = price;
        break;
      default:
        break;
    }

    return (
      <FilterPicker
        key={openType}
        onCancel={this.onPickerClose}
        data={data}
        cols={cols}
        onSave={this.onSave}
        type={openType}
        defaultValue={defaultValue}
      />
    );
  }

  renderFilterMore() {
    const {
      openType,
      filtersData: { roomType, oriented, floor, characteristic },
      selectedValues,
    } = this.state;

    const data = {
      roomType,
      oriented,
      floor,
      characteristic,
    };

    if (openType !== "more") {
      return;
    }

    return <FilterMore data={data} />;
  }

  render() {
    const { titleSelectedStatus, openType } = this.state;
    return (
      <div className="filter_main">
        {/* 前三个菜单的遮罩层 */}

        {openType === "area" || openType === "mode" || openType === "price" ? (
          <div
            className="mask"
            onClick={() => {
              this.onPickerClose(openType);
            }}
          />
        ) : null}

        <div className="content">
          {/* 标题栏 */}
          <FilterTitle
            onClick={this.onTitleClick}
            titleSelectedStatus={titleSelectedStatus}
          />

          {/* 前三个菜单对应的内容： */}
          {this.renderFilterPicker()}

          {/* 最后一个菜单对应的内容： */}
          {this.renderFilterMore()}
        </div>
      </div>
    );
  }
}

export default Filter;
