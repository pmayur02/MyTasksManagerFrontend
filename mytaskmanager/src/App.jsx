import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import TaskManager from "./Components/TaskManager/TaskManager";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/task" element={<TaskManager />} />
      </Routes>
    </Router>
  );
}

export default App;
