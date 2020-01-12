import React, { useState } from "react";
import Cookies from "js-cookie";
import Axios from "axios";

import NavBar from "./NavBar";
import Content from "./Content";

import "./App.css";

const App = () => {
  function checkLoggedIn() {
    return (
      Cookies.get("email") !== undefined &&
      Cookies.get("access_token") !== undefined &&
      Cookies.get("refresh_token") !== undefined
    );
  }

  const [loggedIn, setLoggedIn] = useState(checkLoggedIn());

  function handleLogin(email, access_token, refresh_token) {
    const { common } = Axios.defaults.headers;

    Cookies.set("email", email);
    Cookies.set("access_token", access_token);
    Cookies.set("refresh_token", refresh_token);

    common["email"] = email;
    common["access_token"] = access_token;
    common["refresh_token"] = refresh_token;

    setLoggedIn(true);
  }

  function handleLogout() {
    const { common } = Axios.defaults.headers;

    Cookies.remove("email");
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");

    delete common["email"];
    delete common["access_token"];
    delete common["refresh_token"];

    setLoggedIn(false);
    window.location.replace("/");
  }

  return (
    <div className="app">
      <NavBar loggedIn={loggedIn} handleLogout={handleLogout} />
      <Content loggedIn={loggedIn} handleLogin={handleLogin} />
    </div>
  );
};

export default App;
