import "./App.css";
import MainLayout from "./components/Layout/index";
import StudentManagement from "./pages/StudentManagement";

function App() {
  return (
    <MainLayout className="App">
      <StudentManagement></StudentManagement>
    </MainLayout>
  );
}

export default App;
