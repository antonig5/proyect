import React from "react";
import { Button, Space } from "antd";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const Home = () => {
    const user = useSelector((state) => state.user);
    if (!user.jwt) {
      window.location.href = "/";
    }
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
