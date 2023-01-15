import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Space,
  Table,
  Tabs,
  Tag,
  Modal,
  DatePicker,
  Select,
} from "antd";
import Constants from "../../utils/Constants";
import { LeftOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { CSVLink } from "react-csv";
import moment from "moment";
import { useSelector } from "react-redux";
const { Option } = Select;

const VisitasEmpleado = () => {

  const user = useSelector((state) => state.user);
  if (!user.jwt) {
    window.location.href = "/";
  }
  const [data, setData] = useState([]);
  const [dependencia, setDependencia] = useState([]);
  const datos = (valor) => {
    console.log(valor);
    //filtro por dependencia
    if (valor) {
      fetch(
        `${Constants.URL}/api/ingreso-empleados?populate[0]=users_permissions_user.dependencia&filters[users_permissions_user][dependencia][dependencia]=${valor}`,
        {
          method: "GET",

          headers: {
            "content-type": "application/json",
          },
        }
      )
        .then((r) => r.json())
        .then((r) => {
          const user = [];
          r.data.map((datos) => {
            user.push({
              id: datos.id,
              estados: datos.attributes.estado,
              entradas: datos.attributes.createdAt,
              salidas: datos.attributes.updatedAt,
              users:
                datos.attributes.users_permissions_user.data.attributes.nombre,
              documentos:
                datos.attributes.users_permissions_user.data.attributes
                  .documento,
              dependencias:
                datos.attributes.users_permissions_user.data.attributes
                  .dependencia.data.attributes.dependencia,
              // elementos: datos.elementos.data[0].attributes.nombre,
            });
          });

          setData(user);
        });
    }
  };
  //peticion para llenar tabla visitas de empleados
  const GetEmpleados = () => {
    fetch(
      `${Constants.URL}/api/ingreso-empleados?populate=*&populate[0]=users_permissions_user.dependencia`
    )
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        const user = [];
        r.data.map((datos) => {
          user.push({
            id: datos.id,
            estados: datos.attributes.estado,
            entradas: datos.attributes.createdAt,
            salidas: datos.attributes.updatedAt,
            users:
              datos.attributes.users_permissions_user.data.attributes.nombre,
            documentos:
              datos.attributes.users_permissions_user.data.attributes.documento,
            dependencias:
              datos.attributes.users_permissions_user.data.attributes
                .dependencia.data.attributes.dependencia,
            // elementos: datos.elementos.data[0].attributes.nombre,
          });
        });

        setData(user);
      });
  };
  //peticion dependencias
  const Getdependencia = () => {
    fetch(`${Constants.URL}/api/dependencias`)
      .then((r) => r.json())
      .then((r) => {
        setDependencia(r.data);
      });
  };

  useEffect(() => {
    datos();
    Getdependencia();
    GetEmpleados();
  }, []);

  const headers = [
    { label: "ID", key: "id" },
    { label: "Documento", key: "documentos" },
    { label: "Empleados", key: "users" },
    { label: "Estado", key: "estados" },
    { label: "Dependencia", key: "dependencias" },
    { label: "Fecha entrada", key: "entradas" },
    { label: "Fecha salida", key: "entradas" },
  ];
  ///columnas
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Documento",
      dataIndex: "documentos",
      key: "documentos",
    },
    {
      title: "Empleados",
      dataIndex: "users",
      key: "users",
    },

    {
      title: "Estado",
      dataIndex: "estados",
      key: "estados",
    },
    {
      title: "Dependencia",
      dataIndex: "dependencias",
      key: "dependencias",
    },
    {
      title: "Entrada",
      dataIndex: "entradas",
      key: "entradas",
    },
    {
      title: "Salida",
      dataIndex: "salidas",
      key: "salidas",
    },
  ];
  ///filtro de fechas entrada
  const onSearch = (value) => {
    if (value == null) {
      GetEmpleados();
    } else {
      fetch(
        `${
          Constants.URL
        }/api/ingreso-empleados?populate[0]=users_permissions_user.dependencia&filters[$and][0][createdAt][$containsi]=${moment(
          new Date(value)
        ).format("YYYY-MM-DD")}`
      )
        .then((res) => res.json())
        .then((res) => {
          const user = [];
          res.data.map((datos) => {
            user.push({
              id: datos.id,
              estados: datos.attributes.estado,
              entradas: datos.attributes.createdAt,
              salidas: datos.attributes.updatedAt,
              users:
                datos.attributes.users_permissions_user.data.attributes.nombre,
              documentos:
                datos.attributes.users_permissions_user.data.attributes
                  .documento,
              dependencias:
                datos.attributes.users_permissions_user.data.attributes
                  .dependencia.data.attributes.dependencia,
              // elementos: datos.elementos.data[0].attributes.nombre,
            });
          });

          setData(user);
        });
    }
  };
  ///filtro de fechas salida
  const onSearchExit = (value) => {
    if (value == null) {
      GetEmpleados();
    } else {
      fetch(
        `${
          Constants.URL
        }/api/ingreso-empleados?populate[0]=users_permissions_user.dependencia&filters[$and][0][createdAt][$containsi]=${moment(
          new Date(value)
        ).format("YYYY-MM-DD")}`
      )
        .then((res) => res.json())
        .then((res) => {
          const user = [];
          res.data.map((datos) => {
            user.push({
              id: datos.id,
              estados: datos.attributes.estado,
              entradas: datos.attributes.createdAt,
              salidas: datos.attributes.updatedAt,
              users:
                datos.attributes.users_permissions_user.data.attributes.nombre,
              documentos:
                datos.attributes.users_permissions_user.data.attributes
                  .documento,
              dependencias:
                datos.attributes.users_permissions_user.data.attributes
                  .dependencia.data.attributes.dependencia,
              // elementos: datos.elementos.data[0].attributes.nombre,
            });
          });

          setData(user);
        });
    }
  };

  return (
    <>
      {/*filtros por fechas y tabla de visitas empleados */}
      <NavLink to="/reportes">
        <Button icon={<LeftOutlined />}>Regresar</Button>
      </NavLink>

      <Select placeholder="Dependencias" onChange={datos}>
        {dependencia.map((e) => {
          return (
            <Option value={e.attributes.dependencia} key={e.id}>
              {e.attributes.dependencia}
            </Option>
          );
        })}
      </Select>

      <DatePicker onChange={onSearch} placeholder="fecha entrada" />
      <DatePicker onChange={onSearchExit} placeholder="fecha salida" />
      <CSVLink
        className="ant-btn css-dev-only-do-not-override-9ntgx0 ant-btn-default"
        data={data}
        headers={headers}
      >
        Descargar Excel
      </CSVLink>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default VisitasEmpleado;
