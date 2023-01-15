import React, { useEffect, useState } from "react";
import { Button, Input, Space, Table, Tabs, Tag, Modal } from "antd";
import Constants from "../../utils/Constants";
import { LeftOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { CSVLink } from "react-csv";
const ReporteEmpleado = () => {
  const [data, setData] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [elementos, setElementos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setModalOpen(false);
  };
  const GetEmpleados = () => {
    fetch(
      `${Constants.URL}/api/users?populate=*&filters[$and][0][dependencia][id]=2`
    )
      .then((r) => r.json())
      .then((r) => {
        const dependencia = [];
        r.map((datos) => {
          dependencia.push({
            id: datos.id,
            nombres: datos.nombre,
            apellidos: datos.apellido,
            documentos: datos.documento,
            dependencias: datos.dependencia.dependencia,
          });
        });
        setData(dependencia);
        console.log(r);
      });
  };

  const GetElementos = (id) => {
    fetch(
      `${Constants.URL}/api/elementos?populate=*&filters[$and][0][users][id]=${id}`
    )
      .then((res) => res.json())
      .then((res) => {
        setElementos(res.data);
      });
  };
  const GetVehiculos = (id) => {
    fetch(
      `${Constants.URL}/api/users/${id}?populate=*&populate[0]=vehiculos.marca&populate[1]=vehiculos.tipos_de_vehiculo`
    )
      .then((res) => res.json())
      .then((res) => {
        setVehiculos(res.vehiculos);
      });
  };
  useEffect(() => {
    GetEmpleados();
  }, []);

   const headers = [
     { label: "ID", key: "id" },
     { label: "Nombre", key: "nombres" },
     { label: "Apellido", key: "apellidos" },
     { label: "Documento", key: "documentos" },
     { label: "Dependencia", key: "dependencias" },
   ];


  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nombre",
      dataIndex: "nombres",
      key: "nombres",
    },
    {
      title: "Apellido",
      dataIndex: "apellidos",
      key: "apellidos",
    },
    {
      title: "Documento",
      dataIndex: "documentos",
      key: "documentos",
    },
    {
      title: "Dependencia",
      dataIndex: "dependencias",
      key: "dependencias",
    },

    {
      title: "Action",
      key: "action",
      render: (data) => (
        <Space size="middle">
          <Button
            onClick={() => {
              GetElementos(data.id);
              setIsModalOpen(true);
            }}
          >
            Ver Objetos
          </Button>
          <Button
            onClick={() => {
              GetVehiculos(data.id);
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
      `${Constants.URL}/api/users?populate=*&filters[$and][0][nombre][$contains]=${value.target.value}&filters[$and][0][dependencia][id]=2`
    )
      .then((res) => res.json())
      .then((res) => {
        const dependencia = [];
        res.map((datos) => {
          dependencia.push({
            id: datos.id,
            nombres: datos.nombre,
            apellidos: datos.apellido,
            documentos: datos.documento,
            dependencias: datos.dependencia.dependencia,
          });
        });
        setData(dependencia);
      });
  };
  return (
    <>
      <Modal
        title="Mis Elementos"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {" "}
        {elementos.map((d) => {
          return (
            <ul>
              {" "}
              <li>{d.attributes.nombre} </li>{" "}
            </ul>
          );
        })}
      </Modal>
      <Modal
        title="Mis Vehiculos"
        open={ModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {vehiculos.map((v) => {
          return (
            <ul>
              {" "}
              <li>{v.placa} </li>{" "}
            </ul>
          );
        })}
      </Modal>
      <NavLink to="/reportes">
        <Button icon={<LeftOutlined />}>Regresar</Button>
      </NavLink>

      <Input
        style={{ width: "400px" }}
        onChange={onSearch}
        showCount
        placeholder="Buscar por nombre de empleado "
      />
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

export default ReporteEmpleado;
