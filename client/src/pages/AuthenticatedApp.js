import { Routes, Route } from "react-router-dom";
import "../App.css";
import Editnotepage from "./Editnotepage";
import Homepage from "./Homepage";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/note/edit/:noteId" element={<Editnotepage />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
