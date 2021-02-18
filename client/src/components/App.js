import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import FormMaker from "./forms/FormMaker";
import TestFormMaker from "./forms/TestFormMaker";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Route path="/" component={Header} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/forms/new" component={TestFormMaker} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions) (App);