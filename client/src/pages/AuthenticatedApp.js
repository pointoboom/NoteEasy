import { Routes, Route } from "react-router-dom";
import "../App.css";
import Editnotepage from "./Editnotepage";
import Homepage from "./Homepage";
import Historynote from "./Historynote";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/note/edit/:noteId" element={<Editnotepage />} />
        <Route path="/note/history/:noteId" element={<Historynote />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
