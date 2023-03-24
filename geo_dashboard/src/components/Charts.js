import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import shp from "shpjs/dist/shp.js";

var shpFile;

const Charts = () => {
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
    <div>
      <Container className="">Test</Container>
    </div>
  );
};

export default Charts;
