// import express from "express";
// import mongoose from "mongoose";
// import * as dotenv from 'dotenv';
// const dotenv = require("dotenv").config();
// const express = require("express");
// const register = require("./controllers/auth.js");
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import fs from "fs";
import slash from "slash";
import shp from "shpjs/dist/shp.js";

import shpRoutes from "./routes/shp.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/shp", shpRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server port: ${PORT}`));

// # SAVE LAYER FEATURES TO JSON

var geoJson = {};

export var featuresArray = {};
export var stateWiseDataObject = {};
export var stateWiseDistrictsObject = {};

const toFeaturesJson = (buffer) => {
  var shpPromise = shp(buffer).then((geoJson) => {
    // geoJson.features.map((row) => {
    //   featuresObject[row.properties.dtname] = ;
    // });

    featuresArray = geoJson.features;
    var tmp = {};

    // console.log(featuresObject.map((item) => ))

    // fs.writeFileSync("features.json", JSON.stringify(geoJson));

    toStateWiseData();
  });
};

var file = fs.readFileSync(
  slash(
    String.raw`D:\Coding\Projects\University\RnD\geovisual_analytical_platform\server_side\Crime_Districtwise.zip`
  )
);

toFeaturesJson(file);
// console.log("tmp", tmp);

const toStateWiseData = () => {
  // var finalLabelArray = [];
  featuresArray.map((item) => {
    var properties = item.properties;
    if (stateWiseDataObject[properties.stname]) {
      stateWiseDataObject[properties.stname] = {
        ...stateWiseDataObject[properties.stname],
        2017:
          stateWiseDataObject[properties.stname][2017] + properties["2017s"],
        2018:
          stateWiseDataObject[properties.stname][2018] + properties["2018s"],
        2019:
          stateWiseDataObject[properties.stname][2019] + properties["2019s"],
        2020:
          stateWiseDataObject[properties.stname][2020] + properties["2020s"],
        2021:
          stateWiseDataObject[properties.stname][2021] + properties["2021s"],
      };
    } else {
      stateWiseDataObject[properties.stname] = {
        ...stateWiseDataObject[properties.stname],
        2017: properties["2017s"],
        2018: properties["2018s"],
        2019: properties["2019s"],
        2020: properties["2020s"],
        2021: properties["2021s"],
      };
    }

    // STATE DISTRICT WISE

    if (stateWiseDistrictsObject[properties.stname]) {
      // console.log("1");
      // console.log(stateWiseDistrictsObject);

      // console.log("2");
      stateWiseDistrictsObject[properties.stname][properties.dtname] = {
        2017: 0,
        2018: 0,
        2019: 0,
        2020: 0,
        2021: 0,
      };

      stateWiseDistrictsObject[properties.stname][properties.dtname][2017] =
        properties["2017s"];
      stateWiseDistrictsObject[properties.stname][properties.dtname][2018] =
        properties["2018s"];
      stateWiseDistrictsObject[properties.stname][properties.dtname][2019] =
        properties["2019s"];
      stateWiseDistrictsObject[properties.stname][properties.dtname][2020] =
        properties["2020s"];
      stateWiseDistrictsObject[properties.stname][properties.dtname][2021] =
        properties["2021s"];

      // else {

      // }
    } else {
      // console.log("else");
      stateWiseDistrictsObject[properties.stname] = {};
      stateWiseDistrictsObject[properties.stname][properties.dtname] = {
        2017: 0,
        2018: 0,
        2019: 0,
        2020: 0,
        2021: 0,
      };

      stateWiseDistrictsObject[properties.stname][properties.dtname][2017] =
        properties["2017s"];
      stateWiseDistrictsObject[properties.stname][properties.dtname][2018] =
        properties["2018s"];
      stateWiseDistrictsObject[properties.stname][properties.dtname][2019] =
        properties["2019s"];
      stateWiseDistrictsObject[properties.stname][properties.dtname][2020] =
        properties["2020s"];
      stateWiseDistrictsObject[properties.stname][properties.dtname][2021] =
        properties["2021s"];
    }
  });
  // console.log(stateWiseDistrictsObject);
};
