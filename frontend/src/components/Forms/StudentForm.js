import { Button, InputNumber, Form, Input, DatePicker, Row, Col } from "antd";
import { useEffect } from "react";
import moment from "moment";
import formats from "../../constants/date";

const StudentForm = (props) => {
  const [form] = Form.useForm();

  const studentFormSubmit = async (data) => {
    try {
      const response = await props.request(data, props.data);
      if (response?.status === 200 || response?.status === 201) {
        form.resetFields();
      }
    } catch (error) {
      if (error.response?.status === 400 && error.response.data?.messages) {
        const validationErrors = error.response.data?.messages.error;
        validationErrors.forEach((error) => {
          form.setFields([
            {
              name: error.path,
              errors: [error.message],
            },
          ]);
        });
      }
    }
  };

  const disabledDate = (current) => {
    return current && current > moment().endOf("day");
  };

  useEffect(() => {
    form.setFieldsValue({
      name: props.data?.name,
      dob: props.data?.dob ? moment(props.data?.dob) : null,
      roll_number: props.data?.roll_number,
    });
  }, [form, props]);

  return (
    <Row>
      <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={studentFormSubmit}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input student's name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[{ required: true, message: "Please input student's dob!" }]}
          >
            <DatePicker
              disabledDate={disabledDate}
              format={formats.DATE_FORMAT}
            />
          </Form.Item>

          <Form.Item
            label="Roll Number"
            name="roll_number"
            rules={[
              {
                required: true,
                message: "Please input student's roll number!",
              },
            ]}
          >
            <InputNumber min={1} max={20000000} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {props.buttonText}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default StudentForm;
