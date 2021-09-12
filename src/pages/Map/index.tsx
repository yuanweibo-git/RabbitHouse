import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { getCurrentCity } from "@/utils";

import NavHeader from "@/components/NavHeader";

import "./index.scss";

type Props = RouteComponentProps & {};
type State = {
  lng: number;
  lat: number;
};

class MapBox extends React.Component<Props, State> {
  componentDidMount() {
    const map = new BMapGL.Map("container");

    const point = new BMapGL.Point(116.331398, 39.897445);
    map.centerAndZoom(point, 11);
    getCurrentCity();
  }

  render() {
    return (
      <div className="map">
        <NavHeader {...this.props} title="地图找房" />
        <div id="container" />
      </div>
    );
  }
}

export default MapBox;
