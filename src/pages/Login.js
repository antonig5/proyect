import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Image, Input, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/actions";
import Constants from "../utils/Constants";
import Visitantes from "./Visitantes";

const Login = () => {
  // El componente cuenta con una función 'onFinish' que se ejecuta al presionar el botón de iniciar sesión, esta función se encarga de hacer la petición POST y actualizar el estado del usuario con la respuesta.
  // El formulario cuenta con validaciones para que el campo de correo sea un correo válido y el campo de contraseña no sea vacío.
  // El componente también cuenta con una función 'onFinish' que se ejecuta al presionar el botón de iniciar sesión, esta función se encarga de hacer la petición POST y actualizar el estado del usuario con la respuesta.
  // El formulario cuenta con validaciones para que el campo de correo sea un correo válido y el campo de contraseña no sea vacío.
  // En la parte derecha de la pantalla se muestra una imagen que ilustra el login.
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const onFinish = (data) => {
    fetch(`${Constants.URL}/api/auth/local?populate[0]=role`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        identifier: data.email,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(setUser({ res }));
      });
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <Form
            style={{ marginLeft: 100, marginTop: 200 }}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="E-mail"
                style={{ width: 300 }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                style={{ width: 300 }}
              />
            </Form.Item>
            <Form.Item>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Iniciar sesion
              </Button>
            </Form.Item>
          </Form>
        </Col>

        <Col span={12}>
          <Image
            src="https://cdn.pixabay.com/photo/2015/04/28/19/34/ink-744224_960_720.jpg"
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
    </>
  );
};

export default Login;
