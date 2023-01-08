import React from "react";
import { Button, Space } from "antd";
import { NavLink } from "react-router-dom";
const Home = () => {
  return (
    <Space wrap>
      <Button>
        <NavLink to="/login">Login</NavLink>
      </Button>
      <Button>
        <NavLink to="/visitantes">Visitantes</NavLink>
      </Button>
    </Space>
  );
};

export default Home;
