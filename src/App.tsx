import React, { Component } from "react";
import Home from "./pages/Home/index";
import CityList from "./pages/CityList";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Link to="/">首页11</Link>
          <Link to="/city-list">城市选择11</Link>
          <Route exact path="/" component={Home} />
          <Route exact path="/city-list" component={CityList} />
        </div>
      </Router>
    );
  }
}

export default App;
