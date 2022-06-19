import SimpleTable from "../components/Table/SimpleTable";
import { Button, Drawer, message, Popconfirm, Modal, Descriptions } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { api } from "../constants/api";
import { useState, useEffect } from "react";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Col, Row, Space } from "antd";
import StudentForm from "../components/Forms/StudentForm";
import moment from "moment";
import formats from "../constants/date";

const StudentManagement = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [drawerTitlle, setDrawerTitlle] = useState("Add Student");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <a
          onClick={async () => {
            const student = await fetchStudentById(record.id);
            setSelectedStudent(student);
            setIsModalVisible(true);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
      render: (value, _) => {
        return moment(value).format(formats.DATE_FORMAT);
      },
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
          <Button
            icon={<EditOutlined />}
            onClick={() => editStudentAction(record)}
          >
            Edit
          </Button>
          <Popconfirm
            placement="left"
            title={"Are you sure you want to delete this student?"}
            onConfirm={() => {
              deleteStudent(record);
              fetchStudents();
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchStudents = async () => {
    const response = await axios.get(api.GET_STUDENTS);
    if (response.status === 200) {
      setStudents(response.data);
    } else {
      message.error("Error while fetching students");
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
    const response = await axios.post(api.POST_STUDENTS, data);
    if (response.status === 201) {
      message.success("Student added succesfully");
      setDrawerVisible(false);
      fetchStudents();
    } else {
      message.error("Error while creating student");
    }
    return response;
  };

  const editStudent = async (data, record) => {
    const response = await axios.put(api.PUT_STUDENTS + record.id, data);
    if (response.status === 200) {
      message.success("Student updated succesfully");
      setDrawerVisible(false);
      fetchStudents();
    } else {
      message.error("Error while updating student");
    }
    return response;
  };

  const deleteStudent = async (record) => {
    const response = await axios.delete(api.DELETE_STUDENT + record.id);
    if (response.status === 200) {
      message.success("Student deleted succesfully");
      fetchStudents();
    } else {
      message.error("Error while deleting student");
    }
  };

  const fetchStudentById = async (id) => {
    const response = await axios.get(api.GET_STUDENT + id);
    if (response.status === 200) {
      return response.data;
    } else {
      message.error("Error while deleting student");
      return null;
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
            <Modal
              title="Student Deatils"
              visible={isModalVisible}
              footer={null}
              onCancel={() => {
                setIsModalVisible(false);
                setSelectedStudent(null);
              }}
            >
              <Descriptions bordered>
                <Descriptions.Item label="Name" span={3}>
                  {selectedStudent && selectedStudent.name}
                </Descriptions.Item>
                <Descriptions.Item label="Date of Birth" span={3}>
                  {selectedStudent && selectedStudent.dob}
                </Descriptions.Item>
                <Descriptions.Item label="Roll Number" span={3}>
                  {selectedStudent && selectedStudent.roll_number}
                </Descriptions.Item>
              </Descriptions>
            </Modal>
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
