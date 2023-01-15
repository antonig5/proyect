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
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        {/*// elementos del menú con enlaces a diferentes rutas*/}
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key={1} icon={<SendOutlined />}>
            <NavLink to="/visitas">Visitas</NavLink>
          </Menu.Item>
          <Menu.Item key={2} icon={<TeamOutlined />}>
            <NavLink to="/empleados">Empleados</NavLink>
          </Menu.Item>
          <Menu.Item key={2} icon={<UserSwitchOutlined />}>
            <NavLink to="/ingresoempleados">Ingreso Empleados</NavLink>
          </Menu.Item>
          <Menu.Item key={3} icon={<SolutionOutlined />}>
            <NavLink to="/reportes">Reportes</NavLink>
          </Menu.Item>
          <Menu.Item key={4} icon={<CheckOutlined />}>
            <NavLink to="/aprobarvisitas">Aprobar visitas</NavLink>
          </Menu.Item>

          <Menu.Item key={5} icon={<LogoutOutlined />}>
            <NavLink to="/">Salir</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
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
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Navbar;
