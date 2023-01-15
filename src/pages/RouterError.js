import React from "react";
import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";
const RouterError = () => {
  // El componente RouterError es un componente de error que se muestra cuando el usuario intenta acceder a una ruta no válida.
  // Utiliza el componente Result de antd para mostrar un mensaje de error y un botón para regresar a la página de inicio.
  // El componente utiliza el componente NavLink de react-router-dom para redirigir al usuario a la página de inicio al hacer clic en el botón.
  // El componente utiliza el componente Button de antd para mostrar el botón "Back Home".
  return (
    <Result
      status="404"
      title="404"
      subTitle="Lo siento. La pagina que busca no existe"
      extra={
        <NavLink to="/">
          <Button type="primary">Back Home</Button>
        </NavLink>
      }
    />
  );
};

export default RouterError;
