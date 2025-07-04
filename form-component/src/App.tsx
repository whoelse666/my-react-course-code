import { Button, Checkbox, Input } from "antd";
import Form from "./Form/index";

import { useState } from "react";
const Basic: React.FC = () => {
  const [values, setValues] = useState({});

  const onFinish = (values: any) => {
    console.log("onFinish :>> ", values);
  };
  const onFinishFailed = (errors: any) => {
    console.log("onFinishFailed :>> ", errors);
  };
  const validateRegister = (errors: any) => {
    console.log("onFinishFailed :>> ", errors);
  };
  return (
    <>
      <Button type="primary" onClick={() => {}}>
        打印表单值
      </Button>

      <Button type="primary" onClick={() => {}}>
        设置表单值
      </Button>

      <hr />

      <Form onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={{ remember: true, username: "神说要有光", password: 111111 }}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "请输入用户名!" },
            { max: 6, message: "长度不能大于 6" }
          ]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: "请输入密码!" }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>记住我</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="link" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Basic;
