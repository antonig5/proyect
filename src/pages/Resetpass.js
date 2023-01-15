import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  message
} from "antd";
import axios from "axios";

import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Constants from '../utils/Constants';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Resetpass = (props) => {
   const [response, setResponse] = useState("");
    const [form] = Form.useForm();
     const [searchParams, setSearchParams] = useSearchParams();
   
    let { code } = useParams();
    
    
console.log(searchParams.get('code'));
  const onFinish = (values) => {
    axios
      .post(`${Constants.URL}/api/auth/reset-password`, {
        code: searchParams.get("code"), // code contained in the reset link of step 3.
        password: values.password,
        passwordConfirmation: values.password,
      })
      .then((response) => {
        if (response.status == 200) {
          message.success("Solicitud correcta");
          setResponse(
            "Hemos Cambiado tu contraseña con exito"
          );
        } else if (response.status == 400) {
          message.success("Error");
          setResponse("Error al intentar recuperar contraseña");
        } 
      })
      .catch((error) => {
         message.success("Error");
         setResponse("No hemos logrado cambiar tu contraseña por favor intenta de nuevo su recuperacion");
        console.log("An error occurred:", error.response);
      });

  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <h4 style={{ color: "green", textAlign: "center" }}>{response}</h4>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Crear nueva contraseña
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Resetpass;