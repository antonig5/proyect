import React from "react";

import { Routes, Route } from "react-router-dom";
import Empleados from "../pages/Empleados";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Parqueadero from "../pages/Parqueadero";
import Vehiculos from "../pages/Vehiculos";
import Visitantes from "../pages/Visitantes";
import Visitas from "../pages/Visitas";
import Navbar from "./Navbar";
import Busqueda from '../pages/Busquedas';
import IngresoEmpleados from '../pages/IngresoEmpleados';
const Rutas = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/visitantes" element={<Visitantes />} />
        <Route path="/visitas" element={<Visitas />} />
        <Route path="/vehiculos" element={<Vehiculos />} />
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/parqueadero" element={<Parqueadero />} />
        <Route path="/busqueda" element={<Busqueda />} />
        <Route path="/ingresoempleados" element={<IngresoEmpleados />} />
        <Route path="*" element={<h1>nada</h1>}></Route>
      </Routes>
    </>
  );
};

export default Rutas;
