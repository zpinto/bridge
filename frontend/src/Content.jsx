import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import JobPosting from "./components/JobPosting";
import JobDescriptionView from "./components/JobDecriptionView";
import SubmitApplication from "./components/SubmitApplication";
//import PeerResumeReview from "./components/PeerResumeReview";
import AllApplicationView from "./components/AllApplicationView";

const Content = props => {
  const { loggedIn, handleLogin } = props;

  return (
    <Router>
      <Switch>
        <Route strict exact path="/">
          {loggedIn ? (
            <Home />
          ) : (
            <Login handleLogin={handleLogin} />
          )}
        </Route>
        <Route exact path="/register" component={Register} />
        <Route exact path="/about" component={About} />
        <Route exact path="/JobPosting" component={JobPosting} />
        <Route exact path="/JobDescriptionView" component={JobDescriptionView} />
        <Route exact path="/JobPosting" component={JobPosting} />
        <Route exact path="/SubmitApplication" component={SubmitApplication} />
        {/* <Route exact path="/PeerResumeReview" component={PeerResumeReview} /> */}
         <Route exact path="/AllApplicationView" component={AllApplicationView} /> 
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
    </Router>
  );
};

export default Content;
