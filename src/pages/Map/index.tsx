import React from "react";
import { Map, NavigationControl } from "react-bmapgl";
import { MapChildrenProps } from "react-bmapgl/common";

type Props = MapChildrenProps & {};
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
      <Map
        style={{ height: "100%" }}
        center={new BMapGL.Point(this.state.lng, this.state.lat)}
        zoom={15}
        tilt={40}
        enableScrollWheelZoom
      >
        <NavigationControl map={this.props.map} />
      </Map>
    );
  }
}

export default MapBox;
