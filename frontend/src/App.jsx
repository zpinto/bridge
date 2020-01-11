import React, { useState } from "react";
import Cookies from "js-cookie";
import Axios from "axios";

import NavBar from "./NavBar";
import Content from "./Content";

import "./App.css";

const App = () => {
  function checkLoggedIn() {
    return (
      Cookies.get("email") !== undefined
      /*&&
      Cookies.get("access_token") !== undefined &&
      Cookies.get("refresh_token")
*/
    );
  }

  const [loggedIn, setLoggedIn] = useState(checkLoggedIn());

  function handleLogin(email, password) {
    const { common } = Axios.defaults.headers;

    Cookies.set("email", email);

    common["email"] = email;

    setLoggedIn(true);
  }

  function handleLogout() {
    const { common } = Axios.defaults.headers;

    Cookies.remove("email");

    delete common["email"];

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
