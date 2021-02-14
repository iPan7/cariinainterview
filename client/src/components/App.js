import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Header } from './Header';
import { Form } from './Form';

const Dashboard = () => <h2>Dashboard Placeholder</h2>;
const Landing = () => <h2>Landing</h2>;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
            <Route path="/" component={Header} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/dashboard" component={Form} />

        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
