// importa los componentes necesarios de las bibliotecas react y antd
import React, { useEffect, useState } from "react";
import {
  LogoutOutlined,
  SolutionOutlined,
  TeamOutlined,
  SendOutlined,
  UserSwitchOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";

// desestructurar el componente Layout para facilitar su uso
const { Header, Content, Footer, Sider } = Layout;
// función auxiliar para crear un objeto de elemento para el menú
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
// Componente de la barra de navegación que representa el diseño con el menú de la barra lateral
const Navbar = ({ children }) => {
  // estado para controlar el colapso de la barra lateral
  const [collapsed, setCollapsed] = useState(false);
  const user = useSelector((state) => state.user);
  // usa el color del tema para el fondo del encabezado
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      {user.jwt ? <Sidebar /> : null}

      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          {children}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        ></Footer>
      </Layout>
    </Layout>
  );
};

export default Navbar;
