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
} from "antd";
import Constants from "../../utils/Constants";
import { LeftOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import moment from "moment";
const VisitasVisitante = () => {
  const [data, setData] = useState([]);

  const GetEmpleados = () => {
    fetch(
      `${Constants.URL}/api/visitas?populate=*&filters[$and][0][tipovisitante]=visitante`
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
            // elementos: datos.elementos.data[0].attributes.nombre,
          });
        });

        setData(user);
      });
  };

  useEffect(() => {
    GetEmpleados();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
    {
      title: "Visitante",
      dataIndex: "users",
      key: "users",
    },
  ];
  const onSearch = (value) => {
    const date = new Date(value);
    console.log(moment(date).format("YYY/MM/DD"));

    fetch(
      `${
        Constants.URL
      }/api/visitas?populate=*&filters[$and][0][tipovisitante]=visitante&filters[$and][0][entrada][$containsi]=${moment(
        date
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
  };

  const onSearchExit = (value) => {
    const date = new Date(value);
    console.log(moment(date).format("YYY/MM/DD"));

    fetch(
      `${
        Constants.URL
      }/api/visitas?populate=*&filters[$and][0][tipovisitante]=visitante&filters[$and][0][salida][$containsi]=${moment(
        date
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
  };
  return (
    <>
      <NavLink to="/reportes">
        <Button icon={<LeftOutlined />}>Regresar</Button>
      </NavLink>

      <DatePicker onChange={onSearch} placeholder="fecha entrada" />
      <DatePicker onChange={onSearchExit} placeholder="fecha salida" />

      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default VisitasVisitante;
