import "../css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Link } from "react-router-dom";

import NavbarTop from "./Navbar";
import Charts from "./Charts";
import UploadSHP from "./UploadSHP";

function App() {
  return (
    <div className="App" id="MainDashboard">
      {/* <header className="App-header height-20px">
        Chungus
      </header> */}
      <NavbarTop />
      <Routes>
        <Route path="/upload" element={<UploadSHP />} />
        <Route path="/charts" element={<Charts />} />
      </Routes>
    </div>
  );
}

export default App;
