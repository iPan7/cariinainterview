import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import FormMaker from "./forms/FormMaker";
import TestFormMaker from "./forms/TestFormMaker";
import FormEditor from "./forms/FormEditor";

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
            <Route path="/forms/edit/*" component={FormEditor}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions) (App);