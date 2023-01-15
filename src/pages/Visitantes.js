import React, { useEffect, useState } from "react";
import domtoimage from "dom-to-image";
import Barcode from "react-barcode";
import Constants from "../utils/Constants";
import dayjs from "dayjs";
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
const { Option } = Select;
const { RangePicker } = DatePicker;
const Visitantes = () => {
  const [data, setData] = useState([]);
  const [dependencias, setDependencia] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const onFinish = (data) => {
    fetch(`${Constants.URL}/api/visitantes`, {
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
          fetch(`${Constants.URL}/api/visitas`, {
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
                tipovisitante: "visitante",
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

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().add(23.9, "hour");
  };
  function downloadBarcode() {
    const barcode = document.getElementById("barcode");

    domtoimage.toJpeg(barcode, { quality: 0.95 }).then(function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;

      console.log(dataUrl.toString());
      document.getElementById("a").appendChild(img);
    });
  }

  const getDependencias = (ev) => {
    if (ev == null) {
      setDependencia([]);
    } else {
      console.log(ev);
      fetch(
        `${Constants.URL}/api/dependencias?filters[edad_minima][$lte]=${ev}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setDependencia(res.data);
        });
    }
  };

  return (
    <>
      <Form name="register" onFinish={onFinish}>
        <Form.Item
          name="documento"
          rules={[
            {
              min: 8,
              message: "Se requiere un documento!",
            },
            {
              max: 10,
              message: "Se requiere un documento!",
            },
            {
              required: true,

              message: "Se requiere un documento!",
            },
          ]}
        >
          <Input
            type="number"
            placeholder="Documento"
            minLength={1}
            maxLength={10}
            style={{ width: 200 }}
          />
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
          name="edad"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
            },
          ]}
        >
          <InputNumber
            onChange={getDependencias}
            placeholder="Edad"
            minLength={1}
            maxLength={2}
          />
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

        <Col span={8}>
          <Form.Item
            name="dependencia"
            label="Dependencia"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Dependencia"
              // onChange={onGenderChange}
              allowClear
            >
              {dependencias.map((dependencia) => {
                return (
                  <Option value={dependencia.id}>
                    {dependencia.attributes.dependencia}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item label="Motivo" name="motivo">
            <Select
              placeholder="Motivo dela visita"
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
          <Form.Item name="asunto" rules={[{ required: true }]}>
            <Input placeholder="asunto" />
          </Form.Item>

          <Form.Item
            name="tiempovisita"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              style={{ width: "500px" }}
              minLength={1}
              maxLength={2}
              placeholder="Tiempo estimado de la visita en minutos"
            />
          </Form.Item>

          <Form.Item
            name="fecha"
            label="Ingreso"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker showTime disabledDate={disabledDate} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={showModal}>
              Crear visita
            </Button>
          </Form.Item>
        </Col>
      </Form>

      {data.id > 0 ? (
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk}>
          <div id="barcode">
            <Barcode value={data.id} />
          </div>
          <div id="a"></div>

          <Button onClick={downloadBarcode}>Descargar</Button>
        </Modal>
      ) : null}
    </>
  );
};

export default Visitantes;
