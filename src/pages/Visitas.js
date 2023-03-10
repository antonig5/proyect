import React, { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Constants from '../utils/Constants';

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



const Visitas = () => {

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [datos, setDatos] = useState([]);
  const [marca, setMarca] = useState([]);
  const [tipo, setTipo] = useState([]);
 const [ModalOpen, setModalOpen] = useState(false);
  const [vehiculos, setVehiculos] = useState([])
  const [elementos, setElementos] = useState([]);
  
const user = useSelector((state) => state.user);
if (!user.jwt) {
  window.location.href = "/";
}
  const ingresarVisitante = (idvisita) => {



      confirm({
        title: "Desea ingresar este visitante?",
        
      
        onOk() {
              fetch(`${Constants.URL}/api/visitas/${idvisita}`, {
                method: "PUT",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({
                  data: {
                    estadovisita: 1,
                  },
                }),
              })
                .then((res) => res.json())
                .then((res) => {
                  console.log(res);
                  message.success("Ingresado Correctamente")
                  onSearch(datos.id)
                });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
 
    

  }
  

   const ingresarElemento = (idvisita) => {
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
         console.log("Cancel");
       },
     });
   };
  
   const salidaElemento = (ide) => {
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

    const salidaVisitante = (idvisita) => {
      confirm({
        title: "Desea darle salida a este visitante?",
        content: "Recuerde dar salida a objetos y vehiculos antes de dar salida al visitante",
        onOk() {
          fetch(`${Constants.URL}/api/visitas/${idvisita}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              data: {
                estadovisita: 2,
              },
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              message.success("El Visitante Salio Correctamente");
              setDatos([])
            });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    };


const deleteVehiculo = (data)=> {
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
          message.success("Vehiculo eliminado correctamente")
        });
}
  
  
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
             `${Constants.URL}/api/parqueaderomotos?filters[id][$gt]=30&filters[estado][$eq]=false`,
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
                     data: { parqueaderomoto: res.data[0].id, vehiculo: data.idv },
                   }),
                 }
               )
                 .then((resi) => resi.json())
                 .then((resi) => {
                   console.log("peuabamoto");
                   console.log(resi.data.attributes.parqueaderomoto.data.id);
                   onSearch(datos.id);
                   message.success(
                     "Parqueadero asignado #" +
                       resi.data.attributes.parqueaderomoto.data.id
                   );


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
                     .then((resi) => resi.json())
                     .then((resi) => {
                       console.log(resi);
                       onSearch(datos.id);
                       message.success(
                         "Parqueadero asignado #" +
                           resi.data.attributes.parqueaderomoto.data.id
                       );
                     });
                 });
             });


    } else if (data.topvehiculo == "carro") {
      fetch(`${Constants.URL}/api/parqueaderos?filters[id][$gt]=35&filters[estado][$eq]=false`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {


          console.log("ingreso");
          //agregar ingreso
             fetch(`${Constants.URL}/api/ingresovehiculos?populate[0]=parqueadero`, {
               method: "POST",
               headers: {
                 "content-type": "application/json",
               },
               body: JSON.stringify({
                 data: { parqueadero: res.data[0].id, vehiculo: data.idv },
               }),
             })
               .then((resi) => resi.json())
               .then((resi) => {
                 console.log(resi);
                 onSearch(datos.id);
                 message.success("Parqueadero asignado #" + resi.data.attributes.parqueadero.data.id);
                 

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
      

    if (data.topvehiculo == "carro"){
      fetch(`${Constants.URL}/api/vehiculos/${data.idv}?populate[0]=ingresovehiculos.parqueadero`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
    
      }).then((res) => res.json())
        .then((res) => {
          const ingresos = res.data.attributes.ingresovehiculos.data
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
              }).then((res) => res.json())
                .then((res) => {
                  console.log(res);
                  //liberar parqueadero
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
                      message.success("el Vehiculo a salido con exito")
                      onSearch(datos.id);
                    });
                });
            }

          })

        });
    
    } else if (data.topvehiculo == "moto") {

        fetch(
          `${Constants.URL}/api/vehiculos/${data.idv}?populate[0]=ingresovehiculos.parqueaderomoto`,
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
                  });
              }
            });
          });
    
      
  }
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
         { console.log(record)}
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
  const onSearch = (value) => {
    fetch(
      `${Constants.URL}/api/visitas/${value}?populate[0]=visitante.vehiculos&populate[1]=visitante.vehiculos.ingresovehiculos.parqueadero&populate[2]=visitante.vehiculos.ingresovehiculos&populate[3]=visitante.elementos&populate[4]=visitante.vehiculos.ingresovehiculos.parqueaderomoto&filters[visitante][vehiculos][ingresovehiculos][estado][$eq]=2`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        if (res.data.attributes.estadovisita == 2) {
          message.warning(
            "No hay visitas pendientes que coincidan con este codigo de barras"
          );
        } else {
          const array = [];
          const arrayelementos = [];
          console.log(res.data);

          if (res.data.attributes.visitante.data.attributes.elementos !== null) {
            res.data.attributes.visitante.data.attributes.elementos.data.map((e) => {
              arrayelementos.push({
                key: e.id,
                ide: e.id,
                nombre: e.attributes.nombre,
                estado: e.attributes.estado == 1 ? "ingresado" : "no ha ingresado",
                estadoe: e.attributes.estado,
              });
            });
          }
        
          

setElementos(arrayelementos);
          res.data.attributes.visitante.data.attributes.vehiculos.data.map(
            (v) => {
              const litain = v.attributes.ingresovehiculos.data;
              console.log("vehiculos");
              console.log(litain);

              const d = litain.filter((el) => el.attributes.estado === 1);
console.log("vehiculos2");
              console.log(d);
              array.push({
                key: v.id,
                placa: v.attributes.placa,
                idv: v.id,
                topvehiculo: v.attributes.topvehiculo,
                estadob:
                  v.attributes.ingresovehiculos.data !== null
                    ? d.length > 0
                      ? 1
                      : null
                    : "no ha ingresado",
                estado:
                  v.attributes.ingresovehiculos.data !== null
                    ? `${
                        (console.log("fff"),
                        d.length > 0
                          ? d[0].attributes.parqueadero.data == null
                            ? "ingreso par:" +
                              d[0].attributes.parqueaderomoto.data.id
                            : "ingreso par:" +
                              d[0].attributes.parqueadero.data.id
                          : "no ha ingresado")
                      }`
                    : "no ha ingresado",
              });
            }
          );
          setVehiculos(array);

      

          setDatos(res.data);
        }

        // setVehiculos(res.data)
      });
  };

  const handledSubmit = (element) => {



    fetch(`${Constants.URL}/api/elementos`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
       data:{nombre: element.nombre} 
      })
    }).then((res) => res.json())
      .then((res) => {
        
console.log(res);
    fetch(
      `${Constants.URL}/api/visitantes/${datos.attributes.visitante.data.id}?populate=*`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          data: {
            elementos: {
              connect: [{id: res.data.id}]
            },
          },
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        onSearch(datos.id)
      });
      })




  };

  const EstadoSubmit = (data) => {

 
        console.log(datos.attributes.visitante.data.id);
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
              message.error("Error al crear vehiculo valide los datos e intente de nuevo")
            } else {

               fetch(
              `${Constants.URL}/api/visitantes/${datos.attributes.visitante.data.id}?populate=*`,
              {
                method: "PUT",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({
                  data: {
                    vehiculos: {
                      connect: [{ id: respon.data.id }],
                    },
                  },
                }),
              }
            )
              .then((res) => res.json())
              .then((res) => {
                console.log(res);
                if (res.data!==null) {
                  onSearch(datos.id);
                  message.success("Vehiculo creado y asignado correctamente")
                } else {
                      message.success(
                        "no fue posible asignar el vehiculo"
                      );
                }
               
              })
              .catch((err) => {
                console.log(err);
              });
            }
           
          }).catch((err) => {
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
          {datos.attributes.estado == "Aprobada" ? (
            datos.attributes.estadovisita == 0 ? (
              <Button
                onClick={() => {
                  ingresarVisitante(datos.id);
                }}
                type="primary"
              >
                Ingresar Visitante
              </Button>
            ) : (
              <Button
                onClick={() => {
                  salidaVisitante(datos.id);
                }}
                type="primary"
                danger
              >
                Salir
              </Button>
            )
          ) : null}
        </>
      ) : null}

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
        <Form onFinish={handledSubmit} autoComplete="off">
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
        <Table columns={columnselementos} dataSource={elementos} />
      </Modal>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8} style={{ marginBottom: 10 }}>
            <Card title="Estado" bordered={false}>
              {datos.id > 0 ? (
                <div
                  style={{
                    padding: "5px",
                    borderRadius: "10px",
                    color: "white",
                    background:
                      datos.attributes.estado == "Aprobada" ? "green" : "red",
                  }}
                >
                  {datos.attributes.estado}
                </div>
              ) : null}
            </Card>
          </Col>
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
            <Card title="Tiempo Estimado de visita" bordered={false}>
              {datos.id > 0 ? datos.attributes.tiempovisita : null}
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
