import React from "react";

import { Routes, Route } from "react-router-dom";
import Empleados from "../pages/Empleados";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Parqueadero from "../pages/Parqueadero";
import Reportes from "../pages/Reportes";
import ParqueaderoEmpleado from "../pages/reportes/ParqueaderoEmpleado";
import ParqueaderoVisitantes from "../pages/reportes/ParqueaderoVisitantes";
import ReporteEmpleado from "../pages/reportes/ReporteEmpleado";
import ReporteVisitante from "../pages/reportes/ReporteVisitante";
import VisitasEmpleado from "../pages/reportes/VisitasEmpleado";
import VisitasVisitante from "../pages/reportes/VisitasVisitante";
import Vehiculos from "../pages/Vehiculos";
import Visitantes from "../pages/Visitantes";
import Visitas from "../pages/Visitas";

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
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/reportesEmpleado" element={<ReporteEmpleado />} />
        <Route path="/reportesVisitante" element={<ReporteVisitante />} />
        <Route path="/visitasVisitante" element={<VisitasVisitante />} />
        <Route path="/visitasEmpleado" element={<VisitasEmpleado />} />
        <Route path="/parqueaderoEmpleado" element={<ParqueaderoEmpleado />} />
        <Route
          path="/parqueaderoVisitante"
          element={<ParqueaderoVisitantes />}
        />
        <Route path="/parqueadero" element={<Parqueadero />} />
        <Route path="*" element={<h1>nada</h1>}></Route>
      </Routes>
    </>
  );
};

export default Rutas;
