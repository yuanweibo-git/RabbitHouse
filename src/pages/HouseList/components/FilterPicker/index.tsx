import React, { Component } from "react";

import { PickerView } from "antd-mobile";

import FilterFooter from "@/components/FilterFooter";

type Props = {
  onCancel: (type: string) => void;
  onSave: (type: string, value: any[]) => void;
  data: any[];
  cols: number;
  type: string;
  defaultValue: any[];
};

type State = {
  value: any;
};

export default class FilterPicker extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: this.props.defaultValue,
    };
  }

  render() {
    const { data, cols, onCancel, onSave, type } = this.props;
    const { value } = this.state;
    return (
      <>
        {/* 选择器组件： */}
        <PickerView
          data={data}
          cols={cols}
          value={value}
          onChange={(val) => {
            this.setState({
              value: val,
            });
          }}
        />

        {/* 底部按钮 */}
        <FilterFooter
          onCancel={() => {
            onCancel(type);
          }}
          onOk={() => {
            onSave(type, value);
          }}
        />
      </>
    );
  }
}
