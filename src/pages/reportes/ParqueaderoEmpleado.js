import React, { useEffect, useState } from "react";
import { Button, Input, Space, Table, Tabs, Tag, Modal } from "antd";
import Constants from "../../utils/Constants";
import { LeftOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const ParqueaderoEmpleado = () => {
  const [data, setData] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);

  const [ModalOpen, setModalOpen] = useState(false);

  const handleOk = () => {
    setModalOpen(false);
  };
  const handleCancel = () => {
    setModalOpen(false);
  };

  const GetEmpleados = () => {
    fetch(
      `${Constants.URL}/api/parqueaderomotos?pagination[start]=0&pagination[limit]=35&populate=*&populate[0]=ingresovehiculos.vehiculo`
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
        setData(res);
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

      <Input onChange={onSearch} showCount />
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default ParqueaderoEmpleado;
