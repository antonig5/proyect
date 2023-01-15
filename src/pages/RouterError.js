import React from "react";
import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";
const RouterError = () => {
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
