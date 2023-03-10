import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Space,
  Table,
  Tabs,
  Tag,
  Select,
  DatePicker,
} from "antd";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import Constants from "../../utils/Constants";
import { LeftOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import moment from "moment";
const { Option } = Select;
const VisitasVisitante = () => {
  const user = useSelector((state) => state.user);
  if (!user.jwt) {
    window.location.href = "/";
  }
  const [data, setData] = useState([]);
  const [dependencia, setDependencia] = useState([]);
  //filtro por dependencia
  const datos = (value) => {
    if (value) {
      fetch(
        `${Constants.URL}/api/visitas?populate=*&populate[0]=visitante.dependencia&filters[visitante][dependencia][dependencia]=${value}`
      )
        .then((r) => r.json())
        .then((r) => {
          const user = [];
          r.data.map((datos) => {
            user.push({
              id: datos.id,
              motivos: datos.attributes.motivo,
              asuntos: datos.attributes.asunto,
              entradas: datos.attributes.entrada,
              salidas: datos.attributes.salida,
              users: datos.attributes.visitante.data.attributes.nombre,
              dependencias:
                datos.attributes.visitante.data.attributes.dependencia.data
                  .attributes.dependencia,
              // elementos: datos.elementos.data[0].attributes.nombre,
            });
          });

          setData(user);
        });
    }
  }; //peticion para llenar tabla visitas de empleados
  const GetVisitantes = () => {
    fetch(
      `${Constants.URL}/api/visitas?populate=*&populate[0]=visitante.dependencia`
    )
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        const user = [];
        r.data.map((datos) => {
          user.push({
            id: datos.id,
            motivos: datos.attributes.motivo,
            asuntos: datos.attributes.asunto,
            entradas: datos.attributes.entrada,
            salidas: datos.attributes.salida,
            users: datos.attributes.visitante.data.attributes.nombre,
            dependencias:
              datos.attributes.visitante.data.attributes.dependencia.data
                .attributes.dependencia,
            // elementos: datos.elementos.data[0].attributes.nombre,
          });
        });

        setData(user);
      });
  }; //peticion dependencias
  const Getdependencia = () => {
    fetch(`${Constants.URL}/api/dependencias`)
      .then((r) => r.json())
      .then((r) => {
        setDependencia(r.data);
      });
  };
  useEffect(() => {
    Getdependencia();
    GetVisitantes();
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
      title: "Visitante",
      dataIndex: "users",
      key: "users",
    },
    {
      title: "Dependencia",
      dataIndex: "dependencias",
      key: "dependencias",
    },
    {
      title: "Motivo",
      dataIndex: "motivos",
      key: "motivos",
    },
    {
      title: "Asundo",
      dataIndex: "asuntos",
      key: "asuntos",
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
  ]; ///filtro de fechas entrada
  const onSearch = (value) => {
    if (value == null) {
      GetVisitantes();
    } else {
      fetch(
        `${
          Constants.URL
        }/api/visitas?populate=*&filters[$and][0][entrada][$containsi]=${moment(
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
              users: datos.attributes.visitante.data.attributes.nombre,
              // elementos: datos.elementos.data[0].attributes.nombre,
            });
          });

          setData(user);
        });
    }
  };
  ///filtro de fechas salida
  const onSearchExit = (value) => {
    console.log(value);
    if (value == null) {
      GetVisitantes();
    } else {
      fetch(
        `${
          Constants.URL
        }/api/visitas?populate=*&filters[$and][0][salida][$containsi]=${moment(
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
              users: datos.attributes.visitante.data.attributes.nombre,
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

export default VisitasVisitante;
