import React, { Component } from "react";
import Home from "./pages/Home/index";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import CityList from "./pages/CityList";
import Map from "@/pages/Map";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/home" component={Home} />
          <Route path="/city-list" component={CityList} />
          <Route path="/map" component={Map} />
        </div>
      </Router>
    );
  }
}

export default App;
