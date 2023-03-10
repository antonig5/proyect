import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Space,
  Table,
  Tabs,
  Tag,
  Modal,
  Select,
  Typography,
} from "antd";
import { useSelector } from "react-redux";
import Constants from "../../utils/Constants";
import { LeftOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import Empleados from "../Empleados";
import { CSVLink, CSVDownload } from "react-csv";
const { Option } = Select;
const { Title } = Typography;
const ParqueaderoVisitantes = () => {
  //variable para actualizar y almacenar los datos

  const user = useSelector((state) => state.user);
  if (!user.jwt) {
    window.location.href = "/";
  }
  const [data, setData] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);

  const [ModalOpen, setModalOpen] = useState(false);

  const handleOk = () => {
    setModalOpen(false);
  };
  const handleCancel = () => {
    setModalOpen(false);
  };
  //peticion que llena la tabala empleados
  const GetEmpleados = (ev) => {
    let inicio = 0;
    let final = 35;

    if (ev === "empleados") {
      inicio = 0;
      final = 35;
    } else if (ev === "visitantes") {
      inicio = 35;
      final = 50;
    }

    fetch(
      `${Constants.URL}/api/parqueaderos?pagination[start]=${inicio}&pagination[limit]=${final}&populate=*&populate[0]=ingresovehiculos.vehiculo`
    )
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        const user = [];
        r.data.map((datos) => {
          user.push({
            seccion: datos.attributes.nombre,
            entrada: datos.attributes.createdAt,
            salida: datos.attributes.updatedAt,
            key: datos.id,
            estado: datos.attributes.estado ? "Ocupado" : "Libre",

            // elementos: datos.elementos.data[0].attributes.nombre,
          });
        });

        setData(user);
      });
  };
  ///peticion para traer vehiculos
  const GetVehiculos = (id) => {
    fetch(
      `${Constants.URL}/api/parqueaderos/${id}?&populate=*&populate[0]=ingresovehiculos.vehiculo`
    )
      .then((r) => r.json())
      .then((r) => {
        setVehiculos(r);
      });
  };

  useEffect(() => {
    GetEmpleados();
  }, []);

  //filtro para parqueadero
  const headers = [
    { label: "Paqueadero", key: "seccion" },
    { label: "Fecha Entrada", key: "entrada" },
    { label: "Fecha Salida", key: "salida" },
  ];
  ///columnas de la tabla
  const columns = [
    {
      title: "Parqueadero",
      dataIndex: "seccion",
      key: "seccion",
    },
    {
      title: "Fecha Entrada",
      dataIndex: "entrada",
      key: "entrada",
    },
    {
      title: "Fecha Salida",
      dataIndex: "salida",
      key: "salida",
    },
    {
      title: "Estado",
      key: "estado",
      dataIndex: "estado",
      render: (_, { estado }) => (
        <>
          {estado === "Libre" ? (
            <Tag color={"green"}>{estado}</Tag>
          ) : (
            <Tag color={"red"}>{estado}</Tag>
          )}
        </>
      ),
    },
  ];
  const onSearch = (value) => {
    fetch(
      `${Constants.URL}/api/visitantes?populate=*&filters[$and][0][nombre]=${value.target.value}`
    )
      .then((res) => res.json())
      .then((res) => {
        GetEmpleados(res);
      });
  };
  return (
    <>
      {/* select para filtrar y tabla de parqueaderos de visitantes*/}
      <Title level={3}>Parqueaderos Autos</Title>
      <Modal
        title="Mis Vehiculos"
        open={ModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
      <NavLink to="/reportes">
        <Button icon={<LeftOutlined />}>Regresar</Button>
      </NavLink>
      <Select onChange={GetEmpleados} defaultValue="empleados">
        <Option value="empleados">Empleados</Option>
        <Option value="visitantes">Visitantes</Option>
      </Select>

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

export default ParqueaderoVisitantes;
