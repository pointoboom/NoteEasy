import { Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import "../App.css";

function UnauthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;
