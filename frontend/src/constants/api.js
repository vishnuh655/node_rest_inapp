const API_BASE_URL = "http://localhost:4000/api";
const api = {
  GET_STUDENT: API_BASE_URL + "/v1/students/",
  GET_STUDENTS: API_BASE_URL + "/v1/students",
  POST_STUDENTS: API_BASE_URL + "/v1/students",
  PUT_STUDENTS: API_BASE_URL + "/v1/students/",
  DELETE_STUDENT: API_BASE_URL + "/v1/students/",
};

export { api, API_BASE_URL };
