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
import AprobarVisitas from "../pages/AprobarVisitas";
import Recuperar from "../pages/Recuperar";
import Resetpass from "../pages/Resetpass";
const Rutas = () => {
  return (
    <>
      <Routes>
        {/* Ruta principal que muestra el componente Home */}
        <Route path="/home" element={<Home />} />
        {/* Ruta para el login */}
        <Route path="/" element={<Login />} />
        {/* Rutas para recuperar pass */}
        <Route path="/resetpass" element={<Resetpass />} />
        <Route path="/recuperar" element={<Recuperar />} />
        {/* Ruta para la página de visitantes */}
        <Route path="/visitantes" element={<Visitantes />} />
        {/* Ruta para la página de visitas */}
        <Route path="/visitas" element={<Visitas />} />
        {/* Ruta para la página de empleados */}
        <Route path="/empleados" element={<Empleados />} />
        {/* Ruta para la página de reportes */}
        <Route path="/reportes" element={<Reportes />} />
        {/* Ruta para el reporte de empleados */}
        <Route path="/reportesEmpleado" element={<ReporteEmpleado />} />
        {/* Ruta para el reporte de visitantes */}
        <Route path="/reportesVisitante" element={<ReporteVisitante />} />
        {/* Ruta para el reporte de visitas de visitantes */}
        <Route path="/visitasVisitante" element={<VisitasVisitante />} />
        {/* Ruta para el reporte de visitas de empleados */}
        <Route path="/visitasEmpleado" element={<VisitasEmpleado />} />
        {/* Ruta para el reporte de uso del parqueadero de empleados */}
        <Route path="/parqueaderoEmpleado" element={<ParqueaderoEmpleado />} />
        {/* Ruta para el reporte de uso del parqueadero de visitantes */}
        <Route
          path="/parqueaderoVisitante"
          element={<ParqueaderoVisitantes />}
        />
        <Route path="/aprobarvisitas" element={<AprobarVisitas />} />{" "}
        {/* Ruta para la página de ingreso de empleados */}
        <Route path="/ingresoempleados" element={<IngresoEmpleados />} />
        {/* Ruta para la lista de empleados */}
        <Route path="/listaEmpleado" element={<ListaEmpleado />} />
        {/* Ruta para la lista de visitantes */}
        <Route path="/listaVisitante" element={<ListaVisitantes />} />
        {/* Ruta para manejar errores de url */}
        <Route path="*" element={<RouterError />}></Route>
      </Routes>
    </>
  );
};

export default Rutas;
