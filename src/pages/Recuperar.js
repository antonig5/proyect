import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";

import Constants from '../utils/Constants';
import { useState } from 'react';

const Recuperar = () => {

  const [response, setResponse] = useState("")
  
    const onFinish = (values) => {
      axios
        .post(`${Constants.URL}/api/auth/forgot-password`, {
          email: values.correo, // user's email
        })
        .then((response) => {
          console.log(response);
          if (response.status  ==200) {
            message.success("Solicitud correcta")
            setResponse("Hemos recibido tu solicitud. Si el correo queingresaste pertenece a nuestro sistema recibira un correo electronico con instricciones para recuperar tu contraseña")
          } else if (response.status==400) {
             message.success("Error");
             setResponse("Error al intentar recuperar contraseña");
          } 
           
          
        })
        .catch((error) => {
          message.success("Error");
          setResponse("Error al intentar recuperar contraseña");
          console.log("An error occurred:", error.response);
        });
 
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
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
        label="Correo electronico"
        name="correo"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

     

      
      <h4 style={{ color: "green", textAlign: "center" }}>{ response}</h4>
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
export default Recuperar