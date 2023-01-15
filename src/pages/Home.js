import React from "react";
import { Button, Space, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const { Title } = Typography;
const Home = () => {
  const user = useSelector((state) => state.user);
  if (!user.jwt) {
    window.location.href = "/";
  }
  return (
    <Space wrap>
      <Title style={{ fontSize: 80 }}>Bienvenido</Title>
    </Space>
  );
};

export default Home;
