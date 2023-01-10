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
  Form,
} from "antd";
const { Search } = Input;
const { Option } = Select;

const Visitas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [datos, setDatos] = useState([]);
  const [marca, setMarca] = useState([]);
  const [tipo, setTipo] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [ModalOpen, setModalOpen] = useState(false);
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
    fetch(`${Constants.URL}/api/visitas/${value}?populate[0]=visitante.vehiculos&populate[1]=visitante`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data.id);

        setDatos(res.data);
      });
  };

  const handledSubmit = (element) => {
    fetch(
      `${Constants.URL}/api/visitantes/${datos.attributes.visitante.data.id}?populate=*`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          data: {
            elementos: element.elementos,
          },
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };

  const EstadoSubmit = (data) => {
    fetch(`${Constants.URL}/api/visitas/${datos.id}?populate=*`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        data: {
          estado: data.estado,
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data.attributes.visitante.data.id);
        fetch(
          `${Constants.URL}/api/vehiculos?populate=*`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              data: {
                placa: data.placa,
                marca: data.marca,
                tipos_de_vehiculo: data.tipo,
              },
            }),
          }
        )
          .then((respon) => respon.json())
          .then((respon) => {
            console.log(respon.data.id);
            fetch(
              `${Constants.URL}/api/visitantes/${res.data.attributes.visitante.data.id}?populate=*`,
              {
                method: "PUT",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({
                  data: {
                    vehiculos: [respon.data.id],
                  },
                }),
              }
            );
          });
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
        <Button onClick={showModal}>Agregar elementos</Button>
      ) : null}
      {datos.id > 0 ? <Button onClick={showModall}>Mas</Button> : null}

      <Modal title="Modal" open={ModalOpen} onOk={handleOkey}>
        <Form onFinish={EstadoSubmit}>
          <Form.Item name="estado">
            <Select
              placeholder="Estado de visita"
              style={{
                width: 120,
              }}
              options={[
                {
                  value: "Aprobada",
                  label: "Aprobada",
                },
                {
                  value: "No Aprobada",
                  label: "No Aprobada",
                },
              ]}
            />
          </Form.Item>

          <Form.Item name="placa">
            <Input placeholder="placa" />
          </Form.Item>
          <Form.Item name="marca">
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
          <Form.Item name="tipo">
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {" "}
        <Form onFinish={handledSubmit} autoComplete="off">
          <Form.List name="visitantes">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "elementos"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing first name",
                        },
                      ]}
                    >
                      <Input placeholder="First Name" />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
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
