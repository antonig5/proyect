import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/actions";
import Constants from "../utils/Constants";
import Visitantes from "./Visitantes";

const Login = () => {
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

        <Col span={12}></Col>
      </Row>
    </>
  );
};

export default Login;
