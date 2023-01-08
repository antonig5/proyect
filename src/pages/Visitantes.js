import React, { useEffect, useState } from "react";
import domtoimage from "dom-to-image";
import Barcode from "react-barcode";
import {
  AutoComplete,
  Button,
  Cascader,
  DatePicker,
  Modal,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Col,
} from "antd";
const { RangePicker } = DatePicker;
const Visitantes = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const onFinish = (data) => {
    fetch("http://localhost:1337/api/visitantes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          documento: data.documento,
          nombre: data.nombre,
          apellido: data.apellido,
          edad: data.edad,
          celular: data.celular,
          email: data.email,
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if ((res.status = 200)) {
          fetch("http://localhost:1337/api/visitas", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                motivo: data.motivo,
                asunto: data.asunto,
                visitante: res.data.id,
                entrada: data.fecha[0],
                salida: data.fecha[1],
              },
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              setData(res.data);
            });
        }
      });
  };
  function downloadBarcode() {
    const barcode = document.getElementById("barcode");
    domtoimage.toPng(barcode).then(function (dataUrl) {
      const link = document.createElement("a");
      link.download = "barcode.png";
      link.href = dataUrl;
      link.click();
    });
  }

  return (
    <>
      <Form name="register" onFinish={onFinish}>
        <Row>
          <Col span={8}>
            <Form.Item
              name="documento"
              rules={[
                {
                  required: true,
                  message: "Please input your nickname!",
                },
              ]}
            >
              <InputNumber
                placeholder="Documento"
                minLength={1}
                maxLength={10}
                style={{ width: 200 }}
              />
            </Form.Item>

            <Form.Item
              name="apellido"
              rules={[
                {
                  required: true,
                  message: "Please input your nickname!",
                },
              ]}
            >
              <Input placeholder="Apellido" />
            </Form.Item>

            <Form.Item
              name="nombre"
              rules={[
                {
                  required: true,
                  message: "Please input your nickname!",
                },
              ]}
            >
              <Input placeholder="Nombre" />
            </Form.Item>

            <Form.Item
              name="edad"
              rules={[
                {
                  required: true,
                  message: "Please input your nickname!",
                },
              ]}
            >
              <InputNumber placeholder="Edad" minLength={1} maxLength={2} />
            </Form.Item>

            <Form.Item
              name="celular"
              rules={[
                {
                  required: true,
                  message: "Please input your nickname!",
                },
              ]}
            >
              <InputNumber placeholder="Celular" minLength={1} maxLength={16} />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input placeholder="E-mail" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="motivo">
          <Select
            style={{
              width: 120,
            }}
            options={[
              {
                value: "reclamo",
                label: "Reclamo",
              },
              {
                value: "solicitud",
                label: "Solicitud",
              },

              {
                value: "personal",
                label: "Personal",
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="asunto">
          <Input placeholder="asunto" />
        </Form.Item>

        <Form.Item
          name="fecha"
          label="Ingreso"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <RangePicker showTime />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={showModal}>
            Register
          </Button>
        </Form.Item>
      </Form>
      {data.id > 0 ? (
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk}>
          <Barcode value={data.id} id="barcode" />
          <Button onClick={downloadBarcode}>Descargar</Button>
        </Modal>
      ) : null}
    </>
  );
};

export default Visitantes;
