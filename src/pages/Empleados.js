import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
const { Option } = Select;
const Empleados = () => {
  const [data, setData] = useState([]);
  const onFinish = (value) => {
    fetch("http://localhost:1337/api/auth/local/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        documento: value.documento,
        email: value.email,
        username: value.username,
        password: value.password,
        dependencia: value.dependencia,
        role: value.role,
      }),
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const GetDependencias = () => {
    fetch("http://localhost:1337/api/dependencias")
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
      });
  };

  useEffect(() => {
    GetDependencias();
  }, []);

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="documento"
        rules={[
          {
            max: 10,
          },
          {
            min: 5,
          },
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input placeholder="Documento" type="number" />
      </Form.Item>

      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item name="dependencia">
        <Select placeholder="Dependencia">
          {data.map((element) => {
            return (
              <Option key={element.id} value={element.id}>
                {element.attributes.dependencia}
              </Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item name="role">
        <Select placeholder="Rol">
          <Option key={1}>Empleado</Option>
          <Option key={2}>Secretario</Option>
        </Select>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Empleados;
