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
import moment from "moment";
const { Option } = Select;

const VisitasEmpleado = () => {
  const [data, setData] = useState([]);
  const [dependencia, setDependencia] = useState([]);
  const datos = (valor) => {
    if (value == "trabajo") {
      GetEmpleados();
    }
  };
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

  const onSearch = (value) => {
    if (value == null) {
      GetEmpleados();
    } else {
      fetch(
        `${
          Constants.URL
        }/api/visitas?populate=*&filters[$and][0][tipovisitante]=empleado&filters[$and][0][entrada][$containsi]=${moment(
          new Date(value)
        ).format("YYYY-MM-DD")}`
      )
        .then((res) => res.json())
        .then((res) => {
          const user = [];
          res.data.map((datos) => {
            user.push({
              id: datos.id,
              motivos: datos.attributes.motivo,
              asuntos: datos.attributes.asunto,
              entradas: datos.attributes.entrada,
              salidas: datos.attributes.salida,
              users:
                datos.attributes.users_permissions_user.data.attributes.nombre,
              // elementos: datos.elementos.data[0].attributes.nombre,
            });
          });

          setData(user);
        });
    }
  };

  const onSearchExit = (value) => {
    if (value == null) {
      GetEmpleados();
    } else {
      fetch(
        `${
          Constants.URL
        }/api/visitas?populate=*&filters[$and][0][tipovisitante]=empleado&filters[$and][0][salida][$containsi]=${moment(
          new Date(value)
        ).format("YYYY-MM-DD")}`
      )
        .then((res) => res.json())
        .then((res) => {
          const user = [];
          res.data.map((datos) => {
            user.push({
              id: datos.id,
              motivos: datos.attributes.motivo,
              asuntos: datos.attributes.asunto,
              entradas: datos.attributes.entrada,
              salidas: datos.attributes.salida,
              users:
                datos.attributes.users_permissions_user.data.attributes.nombre,
              // elementos: datos.elementos.data[0].attributes.nombre,
            });
          });

          setData(user);
        });
    }
  };

  return (
    <>
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
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default VisitasEmpleado;