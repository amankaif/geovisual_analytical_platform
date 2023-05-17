// import React from "react";
import React,{useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import shp from "shpjs/dist/shp.js";
import Chart from "react-apexcharts";
// import "./App.css";
import { useRef } from "react";

var shpFile;

const Charts = () => {

  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      },
      {
        name: "series-2",
        data: [45, 90, 80, 12, 98, 60, 10, 75]
      }
    ]
  }
  )
  const fetchSHP = async () => {
    shp("../Crime_Districtwise/Crime_Districtwise.shp").then(function (
      geojson
    ) {
      console.log("hello");
      console.log(geojson);
    });
  };
  fetchSHP();
  // const fetchSHP = `() => {
  //   shp('files/pandr.zip').then(function(geojson){
  //       console.log('hello');
  //   console.log(geojson);
  // });`;

   
  
    return (
      <div className="App">
        <div style={{ display: "flex", 
                      flexWrap: "wrap", 
                      direction: "row" }}> 
        <div className="chart-row"
            display= "flex"
            justify-content= "space-between"
            margin-bottom= "1rem">
          <div classNmae="chart-container"
               display= "inline-block"
               width= "50%"
               box-sizing= "border-box"
               padding= "0.5rem">
          <div style={{ flex: "1 0 50%", padding: "30px" }}>
          <Chart
                options={state.options}
                series={state.series}
                type="bar"
                width="420"
              />
          </div>
          </div>
        </div>
  
        <div className="chart-row"
             display= "flex"
             justify-content= "space-between"
             margin-bottom= "1rem" >
          <div classNmae="chart-container"
               display= "inline-block"
               width= "50%"
               box-sizing= "border-box"
               padding= "0.5rem" >
          <div style={{ flex: "1 0 50%", padding: "30px" }}>
          <Chart
                options={state.options}
                series={state.series}
                type="line"
                width="420"
              />
          </div>
          </div>
        </div>
  
        <div className="chart-row"
            display= "flex"
            justify-content= "space-between"
            margin-bottom= "1rem" >
          <div classNmae="chart-container"
                display= "inline-block"
                width= "50%"
                box-sizing= "border-box"
                padding= "0.5rem" >
          <div style={{ flex: "1 0 50%", padding: "30px" }}>
          <Chart
                options={state.options}
                series={state.series}
                type="area"
                width="420"
              />
          </div>
          </div>
        </div>
  
        <div className="chart-row"
            display= "flex"
            justify-content= "space-between"
            margin-bottom= "1rem" >
          <div classNmae="chart-container"
                display= "inline-block"
                width= "50%"
                box-sizing= "border-box"
                padding= "0.5rem" >
          <div style={{ flex: "1 0 50%", padding: "30px" }}>
          <Chart
                options={state.options}
                series={state.series}
                type="pie"
                width="420"
              />
          </div>
          </div>
        </div>
  
        </div>
      </div>
    );
  
};

export default Charts;
