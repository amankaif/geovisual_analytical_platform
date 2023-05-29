import "../css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Link } from "react-router-dom";

import NavbarTop from "./Navbar";
import Charts from "./Charts/Charts";
import UploadSHP from "./UploadSHP";
import { useEffect, useState } from "react";

import { MapContext } from "../contexts/MapContext";
import { useMapContext } from "../contexts/MapContext";

function App() {
  const [mapJson, setMapJson] = useState("Default Value");
  // useEffect(() => {
  //   console.log("MAPJSON changed", mapJson);
  // }, [mapJson]);

  return (
    <div className="App">
      <MapContext.Provider value={{ mapJson, setMapJson }}>
        <NavbarTop />
        <Routes>
          <Route path="/" element={<Charts />} />
          <Route path="/upload" element={<UploadSHP />} />
          <Route path="/charts" element={<Charts />} />
        </Routes>
      </MapContext.Provider>
    </div>
  );
}

export default App;
