import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";

import "./App.css";

const App = () => {
  const [loggedIn, toggleLogged] = useState(false);
  return (
    <Router>
      <div className="app">
        <NavBar />
        <Switch>
          <Route strict exact path="/" component={loggedIn ? Home : Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/about" component={About} />
          <Route exact path="/portal">
            <h1>Application Portal</h1>
            <h2>Applicant</h2>
          </Route>
          <Route exact path="/review">
            <h1>Review Portal</h1>
            <h2>Applicant</h2>
          </Route>
          <Route exact path="/job/add">
            <h1>Add Job Page</h1>
            <h2>Recruiter</h2>
          </Route>
          <Route exact path="/job/:id">
            <h1>Job Page</h1>
            <h2>Recruiter</h2>
          </Route>
          <Route>
            <h1> ERROR </h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
