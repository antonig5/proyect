import React, { useEffect, useState } from "react";
import { Button, Input, Space, Table, Tabs, Tag, Modal, Select, Typography } from "antd";
import Constants from "../../utils/Constants";
import { LeftOutlined } from "@ant-design/icons";
import { CSVLink, CSVDownload } from "react-csv";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const { Option } = Select;
const { Title } = Typography

const ParqueaderoEmpleado = () => {

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

  const GetEmpleados = (ev) => {
      let inicio = 0;
      let final = 30;

      if (ev === "empleados") {
        inicio = 0;
        final = 35;
      } else if (ev === "visitantes") {
        inicio = 30;
        final = 40;
      }
  
    fetch(
      `${Constants.URL}/api/parqueaderomotos?pagination[start]=${inicio}&pagination[limit]=${final}&populate=*&populate[0]=ingresovehiculos.vehiculo`
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

  const GetVehiculos = (id) => {
    fetch(
      `${Constants.URL}/api/parqueaderomotos/${id}?populate=*&populate[0]=ingresovehiculos.vehiculo`
    )
      .then((r) => r.json())
      .then((r) => {
        setVehiculos(r.data);
      });
  };

  useEffect(() => {
    GetEmpleados();
  }, []);

   const headers = [
     { label: "Paqueadero", key: "seccion" },
     { label: "Fecha Entrada", key: "entrada" },
     { label: "Fecha Salida", key: "salida" },
   ];

  const columns = [
    {
      title: "Seccion",
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
        setData(res);
      });
  };
  return (
    <>
      <Title level={3}>Parqueaderos Motos</Title>
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

export default ParqueaderoEmpleado;
