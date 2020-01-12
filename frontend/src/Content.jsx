import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import Post from "./components/Post";
import Jobs from "./components/Jobs";
import Applicants from "./components/Applicants";
import Postings from "./components/Postings";


import JobDescriptionView from "./components/JobDecriptionView";
import Submission from "./components/Submission";

const Content = props => {
  const { loggedIn, handleLogin } = props;

  return (
    <Router>
      <Switch>
        <Route strict exact path="/">
          {loggedIn ? <Home /> : <Login handleLogin={handleLogin} />}
        </Route>
        <Route exact path="/register" component={Register} />
        <Route exact path="/about" component={About} />
        <Route exact path="/post" component={Post} />
        <Route exact path="/jobs" component={Jobs} />
        <Route exact path="/jobs/:id" component={Applicants} />
        <Route exact path="/postings" component={Postings} />
        <Route exact path="/submit" component={Submission} />

        <Route
          exact
          path="/JobDescriptionView"
          component={JobDescriptionView}
        />
        <Route>
          <h1> ERROR </h1>
        </Route>
      </Switch>
    </Router>
  );
};

export default Content;
