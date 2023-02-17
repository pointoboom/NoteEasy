import { Routes, Route } from "react-router-dom";
import Register from "./Register";
import NoteEasy from "../components/NoteEasy";
import Login from "./Login";
import "../App.css";

function UnauthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/note" element={<NoteEasy />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;
