import React, { useEffect, useState } from "react";
import { Button, Input, Space, Table, Tabs, Tag, Transfer } from "antd";
import Constants from "../utils/Constants";
import { NavLink } from "react-router-dom";

const Reportes = () => {
  return (
    <>
      <NavLink to="/reportesEmpleado">
        {" "}
        <Button>Reporte de Empleados</Button>{" "}
      </NavLink>
      <NavLink to="/reportesVisitante">
        <Button>Reporte de visitantes</Button>{" "}
      </NavLink>
      <NavLink to="/visitasVisitante">
        <Button>Visitas Visitantes</Button>{" "}
      </NavLink>
      <NavLink to="/visitasEmpleado">
        <Button>Visitas Empleados</Button>{" "}
      </NavLink>
      <NavLink to="/parqueaderoEmpleado">
        <Button>Parqueaderos Motos</Button>{" "}
      </NavLink>
      <NavLink to="/parqueaderoVisitante">
        <Button>Parqueaderos Vehiculos</Button>{" "}
      </NavLink>
      <NavLink to="/listaEmpleado">
        <Button>Lista de ingreso vehiculos empleados</Button>
      </NavLink>
      <NavLink to="/listaVisitante">
        <Button>Lista de ingreso vehiculos Visitantes</Button>
      </NavLink>
    </>
  );
};

export default Reportes;
