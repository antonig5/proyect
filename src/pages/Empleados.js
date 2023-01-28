import React, { useEffect, useState } from "react";
import domtoimage from "dom-to-image";

import { useSelector } from "react-redux";
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
import Barcode from "react-barcode";


const { Option } = Select;

const Empleados = () => {

  // Estado para obtener el usuario actualmente logueado
  const user = useSelector((state) => state.user);
  // Si el usuario no tiene un token de JWT, redirigir al inicio de sesión
  if (!user.jwt) {
    window.location.href = "/";
  }
  // Estado para almacenar los datos de los empleados
  const [data, setData] = useState([]);
  // Estado para almacenar los datos de los vehículos de los empleados
  const [datos, setDatos] = useState([]);
  // Estado para controlar si el modal de edición de empleado está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Estado para controlar si el modal de edición de vehículo está abierto o cerrado
  const [ModalOpen, setModalOpen] = useState(false);
  // Estado para almacenar las marcas de los vehículos
  const [marca, setMarca] = useState([]);
  // Estado para almacenar los tipos de vehículos
  const [tipo, setTipo] = useState([]);
  // Estado para almacenar el ID del empleado seleccionado para editar
  const [id, setID] = useState({});
  // Utilizando "Form.useForm()" para inicializar el formulario de edición de empleado
  const [form] = Form.useForm();
  // Estado para almacenar los datos de los vehículos del empleado seleccionado para editar
  const [dataEditCar, setDataEditCar] = useState([]);
    const [code, setCode] = useState({});
  const [OpenCode, setOpenCode] = useState(false);
  // Función para abrir el modal de edición de vehículos
  const showModall = () => {
    setModalOpen(true);
  };
  const abrirModall = () => {
    setOpenCode(true)
  };
  // Función para abrir el modal de edición de empleado
  const showModal = () => {
    setIsModalOpen(true);
  };
  // Función para manejar la confirmación del modal de edición de empleado
  const handleOk = () => {
    setIsModalOpen(false);
    setModalOpen(false);
    setOpenCode(false)
  };
  // Función para manejar la cancelación del modal de edición de empleado
  const handleCancel = () => {
    setIsModalOpen(false);
    setModalOpen(false);
     setOpenCode(false);
  };
  // Función para manejar el envío del formulario de edición de empleado
  const onFinishs = (values) => {
    console.log("Received values of form:", values);
  };
  // Columnas para mostrar en la tabla de empleados
  const columns = [
    {
      title: "Id", // Título de la columna
      dataIndex: "id", // Nombre de la propiedad en los datos de la tabla
      key: "id", // Llave única para cada fila
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
      title: "Acción", // Título de la columna
      key: "action", // Llave única para cada fila
      render: (
        data // Renderizar los botones de eliminar y editar
      ) => (
        <Space size="middle">
          <Button onClick={() => DeleteUsers(data.id)} danger type="primary">
            Eliminar
          </Button>

          <Button
            type="primary"
            onClick={() => {
              // Función para manejar el evento de clic en el botón de editar
              setID(data);
              const arr = [];
              data.vehiculos.map((element) => {
                arr.push({
                  id: element.id,
                  placa: element.placa,
                  topvehiculo: element.topvehiculo,
                  marca: element.marca.marca,
                  tipo: element.tipos_de_vehiculo.tipo,
                });
              });
              console.log(arr);
              setDataEditCar(arr);
              setIsModalOpen(true);
              // Establecer los valores predeterminados en los campos del formulario de edición de empleado
              form.setFieldsValue({ documento: data.documento });
              form.setFieldsValue({ nombre: data.nombre });
              form.setFieldsValue({ apellido: data.apellido });
              form.setFieldsValue({ edad: data.edad });
              form.setFieldsValue({ email: data.email });
              form.setFieldsValue({ username: data.username });
              form.setFieldsValue({ placa: data.vehiculos.placa });
              form.setFieldsValue({ vehiculo: arr });
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
    fetch(
      `${Constants.URL}/api/users?populate[0]=vehiculos&populate[1]=vehiculos.marca&populate[2]=vehiculos.tipos_de_vehiculo`
    )
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

  const UsersEdit = (values) => {
    const car = [];
    console.log("values", values);
    values.vehiculo.map((d) => {
      console.log("vehiculonbms", d);
      if (!d.id) {
        fetch(`${Constants.URL}/api/vehiculos`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            data: {
              placa: d.placa,
              marca: d.marca,
              tipo: d.tipo,
            },
          }),
        })
          .then((resp) => resp.json())
          .then((resp) => {
            fetch(`${Constants.URL}/api/users/${id.id}?populate[0]=vehiculos`, {
              method: "PUT",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                nombre: values.nombre,
                edad: values.edad,
                apellido: values.apellido,
                documento: values.documento,
                email: values.email,
                username: values.username,
                password: values.password,
                dependencia: values.dependencia,
                vehiculos: {
                  connect: [{ id: resp.data.id }],
                },
                role: values.role,
              }),
            })
              .then((res) => res.json())
              .then((res) => {
                GetUsers();
              });
          });
      } else {
        fetch(`${Constants.URL}/api/vehiculos/${d.id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            data: {
              placa: d.placa,
              marca: d.marca,
              tipo: d.tipo,
            },
          }),
        })
          .then((r) => r.json())
          .then((r) => {
            car.push(r.data.id);
          });
      }
    });
    //map

    /*
     */

    /* ;*/
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
          nombre: value.nombre,
          apellido: value.apellido,
          edad: value.edad,
          email: value.email,
          username: value.username,
          password: value.password,
          dependencia: value.dependencia,
          role: value.role,
          horario: {
            connect: [{ id: value.horario }],
          },
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setCode(res.user)
        setModalOpen(false);
        GetUsers();
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
                tipos_de_vehiculo: element.tipos_de_vehiculo,
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
  // Función para eliminar un empleado
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

  const DeleteCars = (id) => {
    fetch(`${Constants.URL}/api/vehiculos/${id}`, {
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


function downloadBarcode() {
  const barcode = document.getElementById("barcode");

  domtoimage.toJpeg(barcode, { quality: 0.95 }).then(function (dataUrl) {
    var img = new Image();
    img.src = dataUrl;
    var link = document.createElement("a");
    link.download = "my-image-name.jpeg";
    link.href = dataUrl;
    link.click();

    //console.log(dataUrl.toString());
    // document.getElementById("a").appendChild(img);

   
  });
}
  
  return (
    <>
      <Modal
        open={isModalOpen}
        title="Create a new collection"
        cancelText="Cancel"
        onCancel={handleCancel}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={UsersEdit}
        >
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
                  },
                ]}
              >
                <Input maxLength={2} />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
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
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.List name="vehiculo" onValuesChange={UsersEdit}>
                {(fieldEdit, { add, remove }) => (
                  <>
                    {fieldEdit.map(({ key, name, ...restField }) => (
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
                            },
                          ]}
                        >
                          <Select placeholder="Tipo">
                            {tipo.map((e) => {
                              return (
                                <Option key={e.id} value={e.id}>
                                  {e.attributes.tipo}
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
                        <Form.Item name={[name, " topvehiculo"]} {...restField}>
                          <Select
                            placeholder="vehiculo"
                            style={{
                              width: 120,
                            }}
                          >
                            {" "}
                            <Option value="carro" key={1}>
                              Carro
                            </Option>
                            <Option value="moto" key={2}>
                              Moto
                            </Option>
                          </Select>
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => {
                            remove(name);
                            DeleteCars(dataEditCar[key].id);
                            console.log(dataEditCar[key].id);
                          }}
                        />
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
                  },
                ]}
              >
                <Input placeholder="Documento" type="number" />
              </Form.Item>

              <Form.Item
                name="nombre"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Nombre" maxLength={10} />
              </Form.Item>
              <Form.Item
                name="apellido"
                rules={[
                  {
                    required: true,
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
                  },
                ]}
              >
                <InputNumber placeholder="Edad" maxLength={2} />
              </Form.Item>

              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
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
                  },
                  {
                    min: 8,
                  },
                  {
                    max: 16,
                  },
                ]}
              >
                <Input.Password placeholder="Password" maxLength={16} />
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
                  <Option key={1} value="portero">
                    Portero
                  </Option>
                  <Option key={2} value="secretario">
                    Secretario
                  </Option>
                  <Option key={2} value="Administrador">
                    Administrador
                  </Option>
                  <Option key={2} value="jefe dependencia">
                    Jefe de Dependencia
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item name="horario">
                <Select placeholder="Jornada">
                  <Option key={1} value="1">
                    Mañana
                  </Option>
                  <Option key={2} value="2">
                    Tarde
                  </Option>
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
                            },
                          ]}
                        >
                          <Input placeholder="placa" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "tipos_de_vehiculo"]}
                          rules={[
                            {
                              required: true,
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
                        <Form.Item name={[name, " topvehiculo"]} {...restField}>
                          <Select
                            placeholder="vehiculo"
                            style={{
                              width: 120,
                            }}
                          >
                            {" "}
                            <Option value="carro" key={1}>
                              Carro
                            </Option>
                            <Option value="moto" key={2}>
                              Moto
                            </Option>
                          </Select>
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
            <Button type="primary" htmlType="submit" onClick={abrirModall}>
              Agregar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {console.log(code.id)}
      <Modal title="Basic Modal" open={OpenCode} onOk={handleOk}>
        <div id="barcode">
          <Barcode value={code.id} /> 
     </div>
       <id id='a'></id>
        
        <Button onClick={downloadBarcode()}>
          Descargar
        </Button>
       
      </Modal>

      <Table columns={columns} dataSource={datos} />
    </>
  );
};

export default Empleados;
