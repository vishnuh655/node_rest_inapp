import SimpleTable from "../components/Table/SimpleTable";
import { Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Col, Row, Space } from "antd";

const StudentManagement = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Roll Number",
      dataIndex: "roll_number",
      key: "roll_number",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button>Edit</Button>
          <Button danger>Delete</Button>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      dob: 32,
      roll_number: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      dob: 42,
      roll_number: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      dob: 32,
      roll_number: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
        <Col span={24} type="flex" align="end">
          <Button type="primary" size="large" icon={<PlusSquareOutlined />}>
            Add Student
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <SimpleTable columns={columns} data={data}></SimpleTable>
        </Col>
      </Row>
    </>
  );
};

export default StudentManagement;
