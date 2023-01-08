import React, { useEffect, useState } from "react";
import { Input, Card, Col, Row, Button, Modal } from "antd";
const { Search } = Input;

const Visitas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [datos, setDatos] = useState([]);

  const onSearch = (value) => {
    fetch("http://localhost:1337/api/visitas/" + value + "?populate=*")
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data.id);

        setDatos(res.data);
      });
  };

  const handledSubmit = () => {
    fetch(
      "http://localhost:1337/api/visitantes?populate=*&filters[$and][0][id][$eq]=" +
        datos.attributes.visitante.data.id,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );
  };

  return (
    <>
      <Search
        placeholder="input search text"
        allowClear
        onSearch={onSearch}
        style={{
          width: 200,
        }}
      />
      {datos.id > 0 ? (
        <Button onClick={showModal}>Agregar elementos</Button>
      ) : null}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8} style={{ marginBottom: 10 }}>
            <Card title="Motivo" bordered={false}>
              {datos.id > 0 ? datos.attributes.motivo : null}
            </Card>
          </Col>
          <Col span={8} style={{ marginBottom: 10 }}>
            <Card title="Asunto" bordered={false}>
              {datos.id > 0 ? datos.attributes.asunto : null}
            </Card>
          </Col>
          <Col span={8} style={{ marginBottom: 10 }}>
            <Card title="Entrada" bordered={false}>
              {datos.id > 0 ? datos.attributes.entrada : null}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Salida" bordered={false}>
              {datos.id > 0 ? datos.attributes.salida : null}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="visitante" bordered={false}>
              {datos.id > 0
                ? datos.attributes.visitante.data.attributes.nombre +
                  " " +
                  datos.attributes.visitante.data.attributes.apellido
                : null}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Documento" bordered={false}>
              {datos.id > 0
                ? datos.attributes.visitante.data.attributes.documento
                : null}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Visitas;
