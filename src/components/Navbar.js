import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { NavLink } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<NavLink to="/">Salir</NavLink>, "3", <UserOutlined />),
  getItem(<NavLink to="/visitas">Visitas</NavLink>, "4", <TeamOutlined />),
  getItem(<NavLink to="/empleados">Empleados</NavLink>, "5", <FileOutlined />),
  getItem(<NavLink to="/reportes">Reportes</NavLink>, "6", <FileOutlined />),
];
const Navbar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
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
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key={1} icon={<UserOutlined />}>
            <NavLink to="/visitas">Visitas</NavLink>
          </Menu.Item>
          <Menu.Item key={2} icon={<UserOutlined />}>
            <NavLink to="/empleados">Empleados</NavLink>
          </Menu.Item>
          <Menu.Item key={3} icon={<UserOutlined />}>
            <NavLink to="/reportes">Reportes</NavLink>
          </Menu.Item>
          <Menu.Item key={4} icon={<UserOutlined />}>
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
