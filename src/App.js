import React from "react";
import { useSelector } from "react-redux";
import "antd/dist/reset.css";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";

import Rutas from "./components/Rutas";

const App = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <>
      <Router>
        <Navbar> {<Rutas />} </Navbar>
      </Router>
    </>
  );
};

export default App;
