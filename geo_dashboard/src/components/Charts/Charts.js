// import React from "react";
import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import shp from "shpjs/dist/shp.js";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Line } from "react-chartjs-2";

// import Chart from "react-apexcharts";
// import "./App.css";
import { MapContext } from "../../contexts/MapContext";
import Overview from "./Overview";
import StateView from "./StateView";

var shpFile;

var featuresJson;

const Charts = () => {
  const [loading, setLoading] = useState(true);
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    // setLoading(true);
    // (async () => {
    //   console.log("requesting features");
    //   await axios.get("http://localhost:5000/shp/features").then((res) => {
    //     console.log("features recieved");
    //     setLoading(false);
    //     featuresJson = res.data;
    //     // console.log(featuresJson);
    //   });
    // })();
  }, []);

  // const { mapJson, setMapJson } = useContext(MapContext);
  return (
    <>
      {/* <div className="container-fluid">test</div> */}
      <Container fluid>
        {/* <div className="m-4">
              <button
                className="btn-primary"
                onClick={() => {
                  setReRender(!reRender);
                }}
              >
                Render
              </button>
            </div> */}
        <div className="h-100 p-2 m-2">
          <div
            // style={{ height: "1000" }}
            className="d-flex flex-row"
          >
            <Col
              xs={7}
              style={{ backgroundColor: "rgba(198, 201, 207, 0.2)" }}
              className="p-2 m-2 rounded"
            >
              <Overview featuresJson={featuresJson}></Overview>
            </Col>
            {/* <Col
            // xs={4}
            // style={{ backgroundColor: "rgba(198, 201, 207, 0.2)" }}
            // className="p-4 m-2 rounded"
            > */}
            <StateView></StateView>
            {/* </Col> */}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Charts;
