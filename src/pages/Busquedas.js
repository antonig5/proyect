
import { useState } from 'react';
import { Form, Input, Button } from "antd";
const Busquedas = () => {
  const [form] = Form.useForm();
  const [items, setItems] = useState([1]);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const addItem = () => {
    setItems([...items, items.length + 1]);
  };

  const removeItem = (index) => {
    setItems(items.filter((item) => item !== index));

  };

  return (
    <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.List name="items">
        {items.map((item, index) => (
          <Form.Item
            key={item}
            label={`Item ${item}`}
            name={[item, "name"]}
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
            <Button type="danger" onClick={() => removeItem(item)}>
              Remove
            </Button>
          </Form.Item>
        ))}
      </Form.List>
      <Button type="primary" onClick={addItem}>
        Add Item
      </Button>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Busquedas;
