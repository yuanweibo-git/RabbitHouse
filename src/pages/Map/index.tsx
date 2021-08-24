import React from "react";
import { Map, NavigationControl } from "react-bmapgl";
import { MapChildrenProps } from "react-bmapgl/common";
import { RouteComponentProps } from "react-router-dom";

import NavHeader from "@/components/NavHeader";

import "./index.scss";

type Props = MapChildrenProps & RouteComponentProps & {};
type State = {
  lng: number;
  lat: number;
};

class MapBox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      lng: 116.404449,
      lat: 39.914889,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const {
        coords: { longitude, latitude },
      } = position;

      this.setState({
        lng: longitude,
        lat: latitude,
      });
    });
  }

  render() {
    return (
      <div className="map">
        <NavHeader {...this.props} title="地图找房" />

        <Map
          style={{ height: "100%" }}
          center={new BMapGL.Point(this.state.lng, this.state.lat)}
          zoom={15}
          tilt={40}
          enableScrollWheelZoom
        >
          <NavigationControl map={this.props.map} />
        </Map>
      </div>
    );
  }
}

export default MapBox;
