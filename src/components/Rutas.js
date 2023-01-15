import React from "react";
import { Routes, Route } from "react-router-dom";
import Empleados from "../pages/Empleados";
import Home from "../pages/Home";
import Login from "../pages/Login";

import Reportes from "../pages/Reportes";
import ParqueaderoEmpleado from "../pages/reportes/ParqueaderoEmpleado";
import ParqueaderoVisitantes from "../pages/reportes/ParqueaderoVisitantes";
import ReporteEmpleado from "../pages/reportes/ReporteEmpleado";
import ReporteVisitante from "../pages/reportes/ReporteVisitante";
import VisitasEmpleado from "../pages/reportes/VisitasEmpleado";
import VisitasVisitante from "../pages/reportes/VisitasVisitante";

import Visitantes from "../pages/Visitantes";
import Visitas from "../pages/Visitas";
import IngresoEmpleados from "../pages/IngresoEmpleados";

import ListaEmpleado from "../pages/reportes/ListaEmpleado";
import ListaVisitantes from "../pages/reportes/ListaVisitantes";
import RouterError from "../pages/RouterError";
const Rutas = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/visitantes" element={<Visitantes />} />
        <Route path="/visitas" element={<Visitas />} />

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

        <Route path="/ingresoempleados" element={<IngresoEmpleados />} />
        <Route path="/listaEmpleado" element={<ListaEmpleado />} />
        <Route path="/listaVisitante" element={<ListaVisitantes />} />
        <Route path="*" element={<RouterError />}></Route>
      </Routes>
    </>
  );
};

export default Rutas;
