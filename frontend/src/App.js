import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import axios from "axios";
import PrivateRoute from "./components/privateRoute";
import PublicRoute from "./components/publicRoute";
import Layout from "./components/layout";
import Home from "./pages/home";
import Students from "./pages/students";
import Courses from "./pages/Courses/courses";
import Teachers from "./pages/Teachers/teachers";
import TeacherCreate from "./pages/Teachers/teacher_create";
import TeacherEdit from "./pages/Teachers/teacher_edit";

axios.defaults.baseURL = "http://localhost/IT_Lab_School/backend/public";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token')
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>

          <Route index element={<Home />} />
          <Route path="/students" element={<Students />} />

          <Route path="/teachers" element={<Teachers />} />
          <Route path="/teachers/create" element={<TeacherCreate />} />
          <Route path="/teachers/:id/edit" element={<TeacherEdit />} />

          <Route path="/courses" element={<Courses />} />
        </Route>

        <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>} />
        <Route path="/register" element={<PublicRoute> <Register /> </PublicRoute>} />
      </Routes>
    </Router >
  );
}

export default App;
