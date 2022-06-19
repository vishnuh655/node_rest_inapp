import SimpleTable from "../components/Table/SimpleTable";
import { Button, Drawer } from "antd";
import axios from "axios";
import { api } from "../constants/api";
import { useState, useEffect } from "react";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Col, Row, Space } from "antd";
import StudentForm from "../components/Forms/StudentForm";

const StudentManagement = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerTitlle, setDrawerTitlle] = useState("Add Student");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);

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
          <Button onClick={() => editStudentAction(record)}>Edit</Button>
          <Button danger>Delete</Button>
        </Space>
      ),
    },
  ];

  const fetchStudents = async () => {
    const response = await axios.get(api.GET_STUDENTS);
    console.log(response);
    if (response.status === 200) {
      setStudents(response.data);
    } else {
      console.log("Error");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudentAction = () => {
    setDrawerTitlle("Add Student");
    setSelectedStudent(null);
    setDrawerVisible(true);
  };

  const editStudentAction = (record) => {
    setDrawerTitlle("Edit Student");
    setSelectedStudent(record);
    setDrawerVisible(true);
  };

  const createStudent = async (data) => {
    console.log(data);
    const response = await axios.post(api.POST_STUDENTS, data);
    console.log(response);
    if (response.status === 201) {
      setDrawerVisible(false);
      fetchStudents();
      return true;
    } else {
      return false;
    }
  };

  const editStudent = async (data, record) => {
    const response = await axios.put(api.PUT_STUDENTS + record.id, data);
    console.log(response);
    if (response.status === 200) {
      setDrawerVisible(false);
      fetchStudents();
      return true;
    } else {
      return false;
    }
  };

  return (
    students && (
      <>
        <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
          <Col span={24} type="flex" align="end">
            <Button
              type="primary"
              size="large"
              icon={<PlusSquareOutlined />}
              onClick={addStudentAction}
            >
              Add Student
            </Button>
            <Drawer
              title={drawerTitlle}
              size={"large"}
              placement={"right"}
              closable={true}
              onClose={() => {
                setDrawerVisible(false);
                fetchStudents();
              }}
              visible={drawerVisible}
            >
              <StudentForm
                request={selectedStudent ? editStudent : createStudent}
                data={selectedStudent}
                buttonText={selectedStudent ? "Update" : "Add"}
              ></StudentForm>
            </Drawer>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <SimpleTable columns={columns} data={students}></SimpleTable>
          </Col>
        </Row>
      </>
    )
  );
};

export default StudentManagement;
