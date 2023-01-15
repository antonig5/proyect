import React, { useEffect, useState } from "react";
import { Button, Input, Space,  Table, Tabs, Tag, Modal, Select } from "antd";
import Constants from "../../utils/Constants";
import { LeftOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import Empleados from '../Empleados';
import { CSVLink, CSVDownload } from "react-csv";
const {Option} = Select

const ParqueaderoVisitantes = () => {
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
    let final = 35;


if (ev==="empleados") {
  inicio = 0;
  final = 35;
} else if("visitantes") {
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
            key: datos.id

            // elementos: datos.elementos.data[0].attributes.nombre,
          });
        });

        setData(user);
      });
  };

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


 const  headers = [
    { label: "Paqueadero", key: "seccion" },
    { label: "Fecha Entrada", key: "entrada" },
    { label: "Fecha Salida", key: "salida" },
  ];

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
      title: "Action",
      key: "action",
      render: (data) => (
        <Space size="middle">
          <Button
            onClick={() => {
              GetVehiculos(data.seccion);
              setModalOpen(true);
            }}
          >
            Ver Vehiculos
          </Button>
        </Space>
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
      <Input style={{ width: "200px" }} onChange={onSearch} showCount />
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
