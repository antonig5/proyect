import React, { useState, useEffect } from "react";
import { Form, Select, DatePicker, Button, message } from "antd";
import Constants from '../utils/Constants';
const { Option } = Select;

const Parqueadero = () => {
  //peticion

  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${Constants.URL}/api/vehiculos`);
      const data = await response.json();
      setVehiculos(data.data);
    }
    fetchData();
  }, []);

  const handleSubmit = (salida, ingreso, vehiculo) => {
    fetch(`${Constants.URL}/api/parqueaderos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          attributes: {
            ingreso: ingreso,
            salida: salida,
            vehiculos: vehiculo,
          },
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if ((data.status = 200)) {
          message.success("ingresado");
        }
      });
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="vehiculo"
        label="Vehiculo"
        rules={[{ required: true, message: "Please select a category" }]}
      >
        <Select>
          {vehiculos.map((items) => {
            return <Option value={items.id}>{items.attributes.placa} </Option>;
          })}{" "}
        </Select>
      </Form.Item>
      <Form.Item
        name="ingreso"
        label="Ingreso"
        rules={[{ required: true, message: "Please select a date" }]}
      >
        <DatePicker showTime />
      </Form.Item>

      <Form.Item
        name="salida"
        label="Salida"
        rules={[{ required: true, message: "Please select a date" }]}
      >
        <DatePicker showTime />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Registrar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Parqueadero;
