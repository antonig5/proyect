import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";

import Rutas from "./components/Rutas";

const App = () => {
  return (
    <>
      <Router>
        <Navbar> {<Rutas />} </Navbar>
      </Router>
    </>
  );
};

export default App;
