import { Routes, Route } from "react-router-dom";
import "../App.css";
import NoteEasy from "../components/NoteEasy";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NoteEasy />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
