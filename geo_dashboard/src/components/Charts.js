// import React from "react";
import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import shp from "shpjs/dist/shp.js";
import axios from "axios";
// import Chart from "react-apexcharts";
// import "./App.css";
import { useRef } from "react";
import { MapContext } from "../contexts/MapContext";

var shpFile;

var featuresJson;

const Charts = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      console.log("requesting features");
      await axios.get("http://localhost:5000/shp/features").then((res) => {
        console.log("features recieved");
        setLoading(false);
        featuresJson = res.data.features;
      });
    })();
  }, []);
  const { mapJson, setMapJson } = useContext(MapContext);
  return (
    <>
      {loading ? (
        <div className="p-6">Loading</div>
      ) : (
        <>
          <div className="p-3">test</div>
        </>
      )}
    </>
  );
};

export default Charts;
