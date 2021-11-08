import React, { createRef } from "react";

import "./index.scss";

type Props = {
  children: JSX.Element;
  height: number;
};

class Sticky extends React.Component<Props> {
  placeholder: any = createRef();
  content: any = createRef();

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  /**
   * @description 窗口滚动事件监听程序
   */
  handleScroll = () => {
    const placeholderEl = this.placeholder.current;
    const contentEl = this.content.current;

    const { top } = placeholderEl.getBoundingClientRect();

    if (top < 0) {
      contentEl.classList.add("filters_sticky");
      placeholderEl.style.height = this.props.height + "px";
    } else {
      contentEl.classList.remove("filters_sticky");
      placeholderEl.style.height = "0px";
    }
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <div>
        <div ref={this.placeholder} />
        <div ref={this.content}>{this.props.children}</div>
      </div>
    );
  }
}

export default Sticky;
