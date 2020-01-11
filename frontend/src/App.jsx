import React, { useState } from "react";
import Cookies from "js-cookie";
import Axios from "axios";

import NavBar from "./NavBar";
import Content from "./Content";

import "./App.css";

const App = () => {
  const [user, changeUser] = useState(null);

  function handleLogin(email, password) {
    // TODO validate
    changeUser(email);
  }

  function handleLogout() {
    // TODO validate
    changeUser(null);
  }

  return (
      <div className="app">
        <NavBar user={user} handleLogout={handleLogout}/>
        <Content user={user} handleLogin={handleLogin} />
      </div>
  );
};

export default App;
