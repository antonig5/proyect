import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Constants from "../utils/Constants";

const { Option } = Select;

const Empleados = () => {
  const [data, setData] = useState([]);
  const [datos, setDatos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);
  const [marca, setMarca] = useState([]);
  const [tipo, setTipo] = useState([]);
  const [form] = Form.useForm();
  const showModall = () => {
    setModalOpen(true);
  };

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
  const onFinishs = (values) => {
    console.log("Received values of form:", values);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Documento",
      dataIndex: "documento",
      key: "documento",
    },
    {
      title: "Parqueadero",
      dataIndex: "numero_parqueadero",
      key: "numero_parqueadero",
    },

    {
      title: "Action",
      key: "action",
      render: (data) => (
        <Space size="middle">
          <Button onClick={() => DeleteUsers(data.id)} danger type="primary">
            Eliminar
          </Button>

          <Button
            type="primary"
            onClick={() => {
              setIsModalOpen(true);
              form.setFieldsValue({ documento: data.documento });
              form.setFieldsValue({ nombre: data.nombre });
              form.setFieldsValue({ apellido: data.apellido });
              form.setFieldsValue({ edad: data.edad });
              form.setFieldsValue({ email: data.email });
              form.setFieldsValue({ username: data.username });
              form.setFieldsValue({ placa: data.vehiculos.placa });
              console.log(data);
            }}
          >
            Editar
          </Button>
        </Space>
      ),
    },
  ];

  const GetMarca = () => {
    fetch(`${Constants.URL}/api/marcas`)
      .then((res) => res.json())
      .then((res) => {
        setMarca(res.data);
      });
  };

  const GetUsers = () => {
    fetch(`${Constants.URL}/api/users?populate=*`)
      .then((res) => res.json())
      .then((res) => {
        setDatos(res);
      });
  };

  const GetTipo = () => {
    fetch(`${Constants.URL}/api/tipos-de-vehiculos`)
      .then((res) => res.json())
      .then((res) => {
        setTipo(res.data);
      });
  };

  const onFinish = (value) => {
    console.log(value.vehiculo);

    fetch(
      `${Constants.URL}/api/auth/local/register?populate[0]=users.vehiculos `,
      {
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
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        value.vehiculo.map((element) => {
          fetch(`${Constants.URL}/api/vehiculos`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              data: {
                placa: element.placa,
                marca: element.marca,
                tipo_de_vehiculo: element.tipo,
              },
            }),
          })
            .then((res) => res.json())
            .then((respon) => {
              fetch(
                `${Constants.URL}/api/users/${res.user.id}?populate[0]=vehiculos`,
                {
                  method: "PUT",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify({
                    vehiculos: {
                      connect: [{ id: respon.data.id }],
                    },
                  }),
                }
              )
                .then((res) => res.json())
                .then((r) => {
                  console.log(r);
                  setModalOpen(false);
                  GetUsers();
                });
            });
        });
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const DeleteUsers = (id) => {
    fetch(`${Constants.URL}/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        message.success("Eliminado");
        GetUsers();
      });
  };

  const GetDependencias = () => {
    fetch(`${Constants.URL}/api/dependencias`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
      });
  };

  useEffect(() => {
    GetDependencias();
    GetMarca();
    GetTipo();
    GetUsers();
  }, []);

  return (
    <>
      <Modal
        open={isModalOpen}
        title="Create a new collection"
        cancelText="Cancel"
        onCancel={handleCancel}
        width={600}
      >
        <Form form={form} layout="vertical" initialValues={{ remember: true }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="documento" label="documento">
                <Input />
              </Form.Item>

              <Form.Item
                name="nombre"
                label="Nombre"
                rules={[
                  {
                    required: true,
                    message: "Please input the title of collection!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="apellido"
                label="Apellido"
                rules={[
                  {
                    required: true,
                    message: "Please input the title of collection!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="edad"
                label="Edad"
                rules={[
                  {
                    required: true,
                    message: "Please input the title of collection!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please input the title of collection!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  {
                    required: true,
                    message: "Please input the title of collection!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.List name="vehiculo">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: "inline",
                          marginBottom: 8,
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "placa"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing first name",
                            },
                          ]}
                        >
                          <Input placeholder="placa" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "tipo"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing last name",
                            },
                          ]}
                        >
                          <Select placeholder="Tipo">
                            {tipo.map((element) => {
                              return (
                                <Option key={element.id} value={element.id}>
                                  {element.attributes.tipo}
                                </Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "marca"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing last name",
                            },
                          ]}
                        >
                          <Select placeholder="Marca">
                            {marca.map((element) => {
                              return (
                                <Option key={element.id} value={element.id}>
                                  {element.attributes.marca}
                                </Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                        <Form.Item name="topvehiculo">
                          <Select
                            placeholder="vehiculo"
                            style={{
                              width: 120,
                            }}
                            options={[
                              {
                                value: "carro",
                                label: "Carro",
                              },
                              {
                                value: "moto",
                                label: "Moto",
                              },
                            ]}
                          />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Agregar
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Modal>

      <Button type="primary" onClick={showModall}>
        Agregar Empleado
      </Button>
      <Modal
        title="Agregar Empleado"
        open={ModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
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
          <Row>
            <Col span={12}>
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
            </Col>

            <Col span={12}>
              <h3>Vehiculos</h3>
              <Form.List name="vehiculo">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: "inline",
                          marginBottom: 8,
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "placa"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing first name",
                            },
                          ]}
                        >
                          <Input placeholder="placa" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "tipo"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing last name",
                            },
                          ]}
                        >
                          <Select placeholder="Tipo">
                            {tipo.map((element) => {
                              return (
                                <Option key={element.id} value={element.id}>
                                  {element.attributes.tipo}
                                </Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "marca"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing last name",
                            },
                          ]}
                        >
                          <Select placeholder="Marca">
                            {marca.map((element) => {
                              return (
                                <Option key={element.id} value={element.id}>
                                  {element.attributes.marca}
                                </Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                        <Form.Item name="topvehiculo">
                          <Select
                            placeholder="vehiculo"
                            style={{
                              width: 120,
                            }}
                            options={[
                              {
                                value: "carro",
                                label: "Carro",
                              },
                              {
                                value: "moto",
                                label: "Moto",
                              },
                            ]}
                          />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
          </Row>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Agregar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={datos} />
    </>
  );
};

export default Empleados;
