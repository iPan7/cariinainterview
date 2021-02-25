import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import FormMaker from "./forms/FormMaker";
import FormEditor from "./forms/FormEditor";
import RenderedForm from "./forms/RenderedForm"

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
            <Route exact path="/" component={this.props.auth === false ? Landing : Dashboard} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/forms/new" component={FormMaker} />
            <Route path="/forms/edit/*" component={FormEditor}/>
            <Route path="/forms/view/*" component={RenderedForm}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions) (App);