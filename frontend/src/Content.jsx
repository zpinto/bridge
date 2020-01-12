import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import Post from "./components/Post";
import Applications from "./components/Applications";
import ApplicationPage from "./components/ApplicationPage";
import Jobs from "./components/Jobs";
import JobPage from "./components/JobPage";
import Submission from "./components/Submission";
import ResumeReview from "./components/ResumeReview";

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
        <Route exact path="/apps" component={Applications} />
        <Route exact path="/apps/:id" component={ApplicationPage} />
        <Route exact path="/jobs" component={Jobs} />
        <Route exact path="/jobs/:id" component={JobPage} />
        <Route exact path="/submit" component={Submission} />
        <Route exact path="/review" component={ResumeReview} />
        <Route>
          <h1> ERROR </h1>
        </Route>
      </Switch>
    </Router>
  );
};

export default Content;
