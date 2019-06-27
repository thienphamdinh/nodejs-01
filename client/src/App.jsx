import React, { Component } from "react";
import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/layouts/Header";
import Login from "./components/Login";
import Register from "./components/Register";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <BrowserRouter>
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
