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
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions";

const { Header, Content, Footer, Sider } = Layout;
function Sidebar(props) {
  // estado para controlar el colapso de la barra lateral
  const [collapsed, setCollapsed] = useState(false);
  const user = useSelector((state) => state.user);
  // usa el color del tema para el fondo del encabezado
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.jwt) {
      window.location.href = "/";
    }
  }, [user]);

  return (
    <>
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
        {}
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          {user.jwt ? (
            user.user.role.name == "portero" ||
            user.user.role.name == "Administrador" ? (
              <>
                <Menu.Item key={1} icon={<SendOutlined />}>
                  <NavLink to="/visitas">Visitas</NavLink>
                </Menu.Item>
                <Menu.Item key={2} icon={<UserSwitchOutlined />}>
                  <NavLink to="/ingresoempleados">Ingreso Empleados</NavLink>
                </Menu.Item>
              </>
            ) : null
          ) : null}

          {user.jwt ? (
            user.user.role.name == "Administrador" ? (
              <>
                <Menu.Item key={3} icon={<TeamOutlined />}>
                  <NavLink to="/empleados">Empleados</NavLink>
                </Menu.Item>

                <Menu.Item key={4} icon={<SolutionOutlined />}>
                  <NavLink to="/reportes">Reportes</NavLink>
                </Menu.Item>
              </>
            ) : null
          ) : null}

          {user.jwt ? (
            user.user.role.name == "Secretario" ||
            user.user.role.name == "Administrador" ? (
              <Menu.Item key={5} icon={<CheckOutlined />}>
                <NavLink to="/aprobarvisitas">Aprobar visitas</NavLink>
              </Menu.Item>
            ) : null
          ) : null}
          {user.jwt ? (
            <Menu.Item key={6} icon={<LogoutOutlined />}>
              <NavLink
                onClick={() => {
                  dispatch(setUser({}));
                }}
              >
                Salir
              </NavLink>
            </Menu.Item>
          ) : null}
        </Menu>
      </Sider>
    </>
  );
}

export default Sidebar;
