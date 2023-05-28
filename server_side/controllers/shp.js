import decompress from "decompress";
import { fileURLToPath } from "url";
import { dirname } from "path";
import slash from "slash";
import axios from "axios";

import { featuresObject } from "../server.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var shp_files_dir = String.raw`D:\Coding\Projects\University\RnD\geovisual_analytical_platform\server_side\shp_files`;
shp_files_dir = slash(shp_files_dir);

export const shpUpload = (req, res) => {
  const orig_dir_name = req.file.originalname.slice(0, -4);
  decompress(
    "shp_files/" + req.file.originalname,
    "shp_files/" + orig_dir_name
  ).then(() => {
    // console.log("hehe");

    var shp_dir_path = shp_files_dir + "/" + orig_dir_name;
    // console.log(shp_dir_path);

    const POST_dataStore = () => {
      let data = JSON.stringify({
        dataStore: {
          name: orig_dir_name,
          "cache and reuse memory maps": true,
          "create spatial index": true,
          connectionParameters: {
            entry: [
              {
                "@key": "url",
                $: "file://" + shp_dir_path,
              },
            ],
          },
        },
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:8084/geoserver/rest/workspaces/uploaded/datastores",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic YWRtaW46Z2Vvc2VydmVy",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const POST_featureType = () => {
      let data = JSON.stringify({
        featureType: {
          name: req.body.layer_name,
          nativeName: orig_dir_name,
          namespace: {
            name: "uploaded",
            href: "http://localhost:8084/geoserver/rest/namespaces/uploaded.json",
          },
          title: req.body.layer_name,
          keywords: {
            string: ["features", orig_dir_name],
          },
          nativeCRS:
            'GEOGCS["WGS 84", \r\n  DATUM["World Geodetic System 1984", \r\n    SPHEROID["WGS 84", 6378137.0, 298.257223563, AUTHORITY["EPSG","7030"]], \r\n    AUTHORITY["EPSG","6326"]], \r\n  PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], \r\n  UNIT["degree", 0.017453292519943295], \r\n  AXIS["Geodetic longitude", EAST], \r\n  AXIS["Geodetic latitude", NORTH], \r\n  AUTHORITY["EPSG","4326"]]',
          srs: "EPSG:4326",
          projectionPolicy: "FORCE_DECLARED",
          enabled: true,
          store: {
            "@class": "dataStore",
            name: "uploaded:" + orig_dir_name,
            href:
              "http://localhost:8084/geoserver/rest/workspaces/uploaded/datastores/" +
              orig_dir_name +
              ".json",
          },
          maxFeatures: 0,
          numDecimals: 0,
          padWithZeros: false,
          forcedDecimal: false,
          overridingServiceSRS: false,
          skipNumberMatched: false,
          circularArcPresent: false,
        },
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url:
          "http://localhost:8084/geoserver/rest/workspaces/uploaded/datastores/" +
          orig_dir_name +
          "/featuretypes",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic YWRtaW46Z2Vvc2VydmVy",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          res.send("Uploaded Datastore and Layer");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    POST_dataStore();
    POST_featureType();
  });
};

export const featuresJson = (req, res) => {
  res.json(featuresObject);
};
