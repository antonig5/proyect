import React, { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Constants from "../utils/Constants";
import dayjs from "dayjs";
import {
  Input,
  Card,
  Col,
  Row,
  Button,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Form,
  message,
  Popconfirm,
} from "antd";
import { useSelector } from "react-redux";
const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;

const IngresoEmpleados = () => {
  // Estado para controlar si el modal de ingreso de visitantes está abierto o no

  const user = useSelector((state) => state.user);
  if (!user.jwt) {
    window.location.href = "/";
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Estado para almacenar los datos del visitante seleccionado
  const [datos, setDatos] = useState([]);
  // Estado para almacenar las marcas de los vehículos
  const [marca, setMarca] = useState([]);
  // Estado para almacenar los tipos de vehículos
  const [tipo, setTipo] = useState([]);
  // Estado para controlar si el modal de ingreso de elementos está abierto o no
  const [ModalOpen, setModalOpen] = useState(false);
  // Estado para almacenar los vehículos del visitante seleccionado
  const [vehiculos, setVehiculos] = useState([]);
  // Estado para almacenar los elementos del visitante seleccionado
  const [elementos, setElementos] = useState([]);
  // Estado para almacenar el motivo de entrada
  const [motivo, setMotivo] = useState("");

  // Función para ingresar un visitante
  const ingresarVisitante = (empleadoid, novedad, motivo) => {
    // Muestra una ventana de confirmación antes de ingresar al visitante

    console.log(novedad + "  " + motivo);

    confirm({
      title: "Desea ingresar este visitante?",

      // Acción a realizar si se confirma el ingreso
      onOk() {
        // Realiza una petición POST a la ruta especificada en "Constants.URL" para ingresar al visitante
        fetch(`${Constants.URL}/api/ingreso-empleados`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            data: {
              estado: "ingreso",
              users_permissions_user: {
                disconnect: [],
                connect: [{ id: datos.id }],
              },
              novedad: novedad,
              motivoentrada: motivo,
            },
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            // Muestra un mensaje de éxito
            message.success("Ingresado Correctamente");
            // Vuelve a buscar los datos del visitante
            onSearch(datos.id);
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // Función para ingresar un elemento
  const ingresarElemento = (idvisita) => {
    // Muestra una ventana de confirmación antes de ingresar el elemento
    confirm({
      title: "Desea ingresar este elemento?",

      onOk() {
        fetch(`${Constants.URL}/api/elementos/${idvisita}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            data: {
              estado: 1,
            },
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            message.success("Ingresado Correctamente");
            onSearch(datos.id);
          });
      },
      onCancel() {
        // Acción a realizar si se cancela el ingreso
        console.log("Cancel");
      },
    });
  };
  // Función para dar salida a un elemento
  const salidaElemento = (ide) => {
    // Muestra una ventana de confirmación antes de dar salida al elemento
    confirm({
      title: "Desea darle salida a este visitante?",

      onOk() {
        fetch(`${Constants.URL}/api/elementos/${ide}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            data: {
              estado: 2,
            },
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            message.success("El elemento Salio Correctamente");
            onSearch(datos.id);
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const salidaVisitante = (idvisita, novedad, motivo) => {
    confirm({
      title: "Desea darle salida a este visitante?",
      content:
        "Recuerde dar salida a objetos y vehiculos antes de dar salida al visitante",
      onOk() {
        fetch(`${Constants.URL}/api/ingreso-empleados/${idvisita}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            data: {
              estado: "salida",
              novedad: novedad,
              motivoentrada: motivo,
            },
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            message.success("El Visitante Salio Correctamente");
            setDatos([]);
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const deleteVehiculo = (data) => {
    console.log(data);

    fetch(`${Constants.URL}/api/vehiculos/${data.idv}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        onSearch(datos.id);
        message.success("Vehiculo eliminado correctamente");
      });
  };

  const deleteElemento = (data) => {
    console.log(data);

    fetch(`${Constants.URL}/api/elementos/${data.ide}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        onSearch(datos.id);
        message.success("Elemento eliminado correctamente");
      });
  };

  const ingresarVehiculo = (data) => {
    console.log(data);
    if (data.topvehiculo == "moto") {
           fetch(
             `${Constants.URL}/api/parqueaderomotos?filters[id][$gt]=0&filters[estado][$eq]=false`,
             {
               method: "GET",
               headers: {
                 "content-type": "application/json",
               },
             }
           )
             .then((res) => res.json())
             .then((res) => {
               console.log("ingreso");
               //agregar ingreso
               fetch(
                 `${Constants.URL}/api/ingresovehiculos?populate[0]=parqueadero&populate[1]=parqueaderomoto`,
                 {
                   method: "POST",
                   headers: {
                     "content-type": "application/json",
                   },
                   body: JSON.stringify({
                     data: {
                       parqueaderomoto: res.data[0].id,
                       vehiculo: data.idv,
                     },
                   }),
                 }
               )
                 .then((resi) => resi.json())
                 .then((resi) => {
                 
                 

                   fetch(
                     `${Constants.URL}/api/parqueaderomotos/${resi.data.attributes.parqueaderomoto.data.id}`,
                     {
                       method: "PUT",
                       headers: {
                         "content-type": "application/json",
                       },
                       body: JSON.stringify({
                         data: {
                           estado: true,
                         },
                       }),
                     }
                   )
                     .then((resm) => resm.json())
                     .then((resm) => {
                       console.log(resi);
                       onSearch(datos.id);
                       message.success("Parqueadero asignado #" + resm.data.id);
                     });
                 });
             });
    } else if (data.topvehiculo == "carro") {
      fetch(
        `${Constants.URL}/api/parqueaderos?filters[id][$gt]=2&filters[id][$lte]=35&filters[estado][$eq]=false&pagination[limit]=100`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log("ingreso");
          //agregar ingreso

          fetch(
            `${Constants.URL}/api/ingresovehiculos?populate[0]=parqueadero`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                data: { parqueadero: res.data[0].id, vehiculo: data.idv },
              }),
            }
          )
            .then((resi) => resi.json())
            .then((resi) => {
            

              fetch(
                `${Constants.URL}/api/parqueaderos/${resi.data.attributes.parqueadero.data.id}`,
                {
                  method: "PUT",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify({
                    data: {
                      estado: true,
                    },
                  }),
                }
              )
                .then((resi) => resi.json())
                .then((resi) => {
                  console.log(resi);
                  onSearch(datos.id);
                  message.success(
                    "Parqueadero asignado #" +
                      resi.data.attributes.parqueadero.data.id
                  );
                });
            });
        });
    }
  };

  const salidaVehiculo = (data) => {
    console.log("salida ");
    console.log(data);
    fetch(
      `${Constants.URL}/api/vehiculos/${data.idv}?populate[0]=ingresovehiculos.parqueadero&populate[1]=ingresovehiculos.parqueaderomoto`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        const ingresos = res.data.attributes.ingresovehiculos.data;
        ingresos.map((ingreso) => {
          console.log(ingreso.id);

          if (ingreso.attributes.estado == 1) {
            fetch(`${Constants.URL}/api/ingresovehiculos/${ingreso.id}`, {
              method: "PUT",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                data: {
                  estado: 2,
                },
              }),
            })
              .then((res) => res.json())
              .then((res) => {
                console.log(res);
                //liberar parqueadero
                if (data.topvehiculo == "carro") {
                  fetch(
                    `${Constants.URL}/api/parqueaderos/${ingreso.attributes.parqueadero.data.id}`,
                    {
                      method: "PUT",
                      headers: {
                        "content-type": "application/json",
                      },
                      body: JSON.stringify({
                        data: {
                          estado: false,
                        },
                      }),
                    }
                  )
                    .then((res) => res.json())
                    .then((res) => {
                      console.log(res);
                      message.success("el Vehiculo a salido con exito");
                      onSearch(datos.id);
                    });
                } else {
                  console.log(ingreso.attributes);

                  fetch(
                    `${Constants.URL}/api/parqueaderomotos/${ingreso.attributes.parqueaderomoto.data.id}`,
                    {
                      method: "PUT",
                      headers: {
                        "content-type": "application/json",
                      },
                      body: JSON.stringify({
                        data: {
                          estado: false,
                        },
                      }),
                    }
                  )
                    .then((res) => res.json())
                    .then((res) => {
                      console.log(res);
                      message.success("el Vehiculo a salido con exito");
                      onSearch(datos.id);
                    });
                }

                ///fin liberar
              });
          }
        });
      });
  };

  const columnselementos = [
    {
      title: "ID",
      dataIndex: "ide",
      key: "ide",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {console.log(record)}
          {record.estadoe == 1 ? (
            <Button
              onClick={() => {
                salidaElemento(record.ide);
              }}
            >
              {" "}
              Salir
            </Button>
          ) : (
            <Button
              onClick={() => {
                ingresarElemento(record.ide);
              }}
            >
              {" "}
              Ingresar
            </Button>
          )}

          <Button
            onClick={() => {
              deleteElemento(record);
            }}
          >
            {" "}
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "idv",
      key: "idv",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Placa",
      dataIndex: "placa",
      key: "placa",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Vehiculo",
      dataIndex: "topvehiculo",
      key: "topvehiculo",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (text) => <p>{text}</p>,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {console.log(record)}
          {record.estadob == 1 ? (
            <Button
              onClick={() => {
                salidaVehiculo(record);
              }}
            >
              {" "}
              Salir
            </Button>
          ) : (
            <Button
              onClick={() => {
                ingresarVehiculo(record);
              }}
            >
              {" "}
              Ingresar
            </Button>
          )}

          <Button
            onClick={() => {
              deleteVehiculo(record);
            }}
          >
            {" "}
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setModalOpen(false);
  };

  const showModall = () => {
    setModalOpen(true);
  };
  const handleOkey = () => {
    setModalOpen(false);
  };

  const GetMarca = () => {
    fetch(`${Constants.URL}/api/marcas`)
      .then((res) => res.json())
      .then((res) => {
        setMarca(res.data);
      });
  };

  const GetTipo = () => {
    fetch(`${Constants.URL}/api/tipos-de-vehiculos`)
      .then((res) => res.json())
      .then((res) => {
        setTipo(res.data);
      });
  };
  //http://192.168.0.113:1337/api/global?populate[0]=footer.logo&populate[1]=footer.columns.links
  // Función para buscar un visitante
  const onSearch = (value) => {
    // Realiza una petición GET a la ruta especificada en "Constants.URL" para buscar el visitante
    fetch(
      `${Constants.URL}/api/users/${value}?populate[0]=vehiculos.ingresovehiculos.parqueadero&populate[1]=elementos&populate[2]=ingreso_empleados&populate[3]=horario&populate[4]=dependencia&populate[5]=vehiculos.ingresovehiculos.parqueaderomoto`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.ingreso_empleados);
        console.log("busqueda");
        const d = res.ingreso_empleados.filter((el) => el.estado === "ingreso");
        console.log("prueba idvisita");

        if (d.length > 0) {
          res.estadovisita = 1;
          res.idvisita = d[0].id;
        } else {
          res.estadovisita = 0;
        }

        const array = [];
        const arrayelementos = [];

        res.elementos.map((e) => {
          arrayelementos.push({
            key: e.id,
            ide: e.id,
            nombre: e.nombre,
            estado: e.estado == 1 ? "ingresado" : "no ha ingresado",
            estadoe: e.estado,
          });
        });
        setElementos(arrayelementos);
        res.vehiculos.map((v) => {
          const litain = v.ingresovehiculos;
          console.log(v.ingresovehiculos);

          const d = litain.filter((el) => el.estado === 1);
console.log("busqueda vi");
          console.log(d);
          array.push({
            key: v.id,
            placa: v.placa,
            idv: v.id,
            topvehiculo: v.topvehiculo,
            estadob:
              v.ingresovehiculos.length > 0
                ? d.length > 0
                  ? 1
                  : null
                : "no ha ingresado",
            estado:
              v.ingresovehiculos.length > 0
                ? `${
                    (console.log("fff"),
                    d.length > 0
                      ? d[0].parqueadero == null
                        ? "ingreso par:" +
                          d[0].parqueaderomoto.id
                        : "ingreso par:" + d[0].parqueadero.id
                      : "no ha ingresado")
                  }`
                : "no ha ingresado",
          });
        });
        setVehiculos(array);

        /*    console.log(
                res.data.attributes.visitante.data.attributes.vehiculos.data
              );*/

        setDatos(res);
      });
  };

  const crearElementos = (element) => {
    fetch(`${Constants.URL}/api/elementos`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        data: { nombre: element.nombre },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        fetch(`${Constants.URL}/api/users/${datos.id}?populate=*`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            elementos: {
              connect: [{ id: res.data.id }],
            },
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            onSearch(datos.id);
          });
      });
  };

  const EstadoSubmit = (data) => {
    console.log(datos.id);
    fetch(`${Constants.URL}/api/vehiculos`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        data: {
          placa: data.placa,
          marca: data.marca,
          tipos_de_vehiculo: data.tipo,
          topvehiculo: data.topvehiculo,
        },
      }),
    })
      .then((respon) => respon.json())
      .then((respon) => {
        console.log(respon.data.id);
        if (respon.data == null) {
          console.log("weeee");
          message.error(
            "Error al crear vehiculo valide los datos e intente de nuevo"
          );
        } else {
          fetch(`${Constants.URL}/api/users/${datos.id}?populate=*`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              vehiculos: {
                connect: [{ id: respon.data.id }],
              },
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              if (res.data !== null) {
                onSearch(datos.id);
                message.success("Vehiculo creado y asignado correctamente");
              } else {
                message.success("no fue posible asignar el vehiculo");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        message.error(
          "Error al crear vehiculo valide los datos e intente de nuevo"
        );
      });
  };

  useEffect(() => {
    GetMarca();
    GetTipo();
  }, []);

  return (
    <>
      {/* Componente para buscar un visitante */}
      <Search
        placeholder="input search text"
        allowClear
        onSearch={onSearch}
        style={{
          width: 200,
        }}
      />

      {datos.id > 0 ? (
        <>
          <Button onClick={showModal}>Agregar elementos</Button>
          <Button onClick={showModall}>ingresar vehiculos</Button>
        </>
      ) : null}

      {datos.estadovisita == 0 ? (
        datos.id ? (
          dayjs().format("YYYY-MM-DD HH:mm:ss") >
          dayjs(
            dayjs().format("YYYY-MM-DD ") + " " + datos.horario.horaentrada
          ).format("YYYY-MM-DD HH:mm:ss") ? (
            <>
              {datos.permisoentrada == true ? (
                datos.estadovisita == 0 ? (
                  <>
                    <Input
                      placeholder="Motivo de ingreso tarde"
                      onChange={(text) => {
                        setMotivo(text.target.value);
                        console.log(text.target.value);
                      }}
                    />
                    <Button
                      onClick={() => {
                        ingresarVisitante(datos.id, "ingreso-tarde", motivo);
                      }}
                      type="primary"
                    >
                      Ingresar Empleado
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      salidaVisitante(datos.idvisita);
                    }}
                    type="primary"
                    danger
                  >
                    Salir
                  </Button>
                )
              ) : null}

              <p>es muy tarde para ingregar</p>
            </>
          ) : datos.estadovisita == 0 ? (
            <Button
              onClick={() => {
                ingresarVisitante(datos.id);
              }}
              type="primary"
            >
              Ingresar Empleado
            </Button>
          ) : (
            <Button
              onClick={() => {
                salidaVisitante(datos.idvisita);
              }}
              type="primary"
              danger
            >
              Salir
            </Button>
          )
        ) : null
      ) : datos.id ? (
        dayjs().format("YYYY-MM-DD HH:mm:ss") <
        dayjs(
          dayjs().format("YYYY-MM-DD ") + " " + datos.horario.horasalida
        ).format("YYYY-MM-DD HH:mm:ss") ? (
          <>
            {" "}
            {datos.permisosalida == true ? (
              datos.estadovisita == 0 ? (
                <Button
                  onClick={() => {
                    ingresarVisitante(datos.id);
                  }}
                  type="primary"
                >
                  Ingresar Empleado
                </Button>
              ) : (
                //Salida con permiso
                <>
                  <Input
                    placeholder="Motivo de salida tarde"
                    onChange={(text) => setMotivo(text)}
                  />
                  <Button
                    onClick={() => {
                      salidaVisitante(
                        datos.idvisita,
                        "salida-temprano",
                        motivo
                      );
                    }}
                    type="primary"
                    danger
                  >
                    Salir
                  </Button>
                </>
              )
            ) : null}
            <p>es muy temprano para Salir</p>
          </>
        ) : (
          <>
            {datos.estadovisita == 0 ? (
              <Button
                onClick={() => {
                  ingresarVisitante(datos.id);
                }}
                type="primary"
              >
                Ingresar Empleado
              </Button>
            ) : (
              <Button
                onClick={() => {
                  salidaVisitante(datos.idvisita);
                }}
                type="primary"
                danger
              >
                Salir
              </Button>
            )}
          </>
        )
      ) : null}

      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8} style={{ marginBottom: 10 }}>
            <Card title="Nombre" bordered={false}>
              {datos.id > 0 ? datos.nombre : null}
            </Card>
          </Col>
          <Col span={8} style={{ marginBottom: 10 }}>
            <Card title="Apellidos" bordered={false}>
              {datos.id > 0 ? datos.apellido : null}
            </Card>
          </Col>
          <Col span={8} style={{ marginBottom: 10 }}>
            <Card title="Documento" bordered={false}>
              {datos.id > 0 ? datos.documento : null}
            </Card>
          </Col>
          <Col span={8} style={{ marginBottom: 10 }}>
            <Card title="Correo" bordered={false}>
              {datos.id > 0 ? datos.email : null}
            </Card>
          </Col>
          <Col span={8} style={{ marginBottom: 10 }}>
            <Card title="Dependencia" bordered={false}>
              {datos.id > 0 ? datos.dependencia.dependencia : null}
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        width={700}
        footer={null}
        title="Crear Vehiculo"
        onCancel={handleCancel}
        open={ModalOpen}
        onOk={handleOkey}
      >
        <Form onFinish={EstadoSubmit}>
          <Form.Item
            name="placa"
            rules={[{ required: true, message: "Este campo es requerido" }]}
          >
            <Input placeholder="placa" />
          </Form.Item>
          <Form.Item
            name="marca"
            rules={[{ required: true, message: "Este campo es requerido" }]}
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
          <Form.Item
            name="tipo"
            rules={[{ required: true, message: "Este campo es requerido" }]}
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
            name="topvehiculo"
            rules={[{ required: true, message: "Este campo es requerido" }]}
          >
            <Select placeholder="Vehiculo">
              <Option key={"carro"} value={"carro"}>
                Carro
              </Option>
              <Option key={"moto"} value={"moto"}>
                Moto
              </Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Crear
            </Button>
          </Form.Item>
        </Form>
        <h3>Ingresar Vehiculo</h3>

        <Table columns={columns} dataSource={vehiculos} />
      </Modal>

      <Modal
        title="Crear Elementos"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {" "}
        <Form onFinish={crearElementos} autoComplete="off">
          <Form.Item
            name="nombre"
            rules={[{ required: true, message: "Este campo es requerido" }]}
          >
            <Input placeholder="Nombre" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Crear
            </Button>
          </Form.Item>
        </Form>
        {/* Tabla para mostrar los vehículos del visitante */}
        <Table columns={columnselementos} dataSource={elementos} />
      </Modal>
    </>
  );
};

export default IngresoEmpleados;
