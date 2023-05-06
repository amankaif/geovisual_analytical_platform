import decompress from "decompress";
import { fileURLToPath } from "url";
import { dirname } from "path";
import slash from "slash";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var unzipped_dir = String.raw`D:\Coding\Projects\University\RnD\geovisual_analytical_platform\server_side\shp_files\unzipped`;
unzipped_dir = slash(unzipped_dir);

export const shpUpload = (req, res) => {
  console.log(req.file.originalname.slice(0, -4));
  res.send("received");
  decompress(
    "shp_files/" + req.file.originalname,
    "shp_files/" + req.file.originalname.slice(0, -4)
  ).then(() => {
    console.log("hehe");

    var shp_path = unzipped_dir + req.file.originalname + ".shp";

    // axios({
    //   method: "POST",
    //   url: "http://localhost:8084/geoserver/workspaces/uploaded/datastores",
    //   headers: { "Content-Type": "application/json" },
    //   data: {
    //     dataStore: {
    //       name: req.file.originalname.slice(0, -4),
    //       connectionParameters: {
    //         entry: [{ "@key": "url", $: "file:" + shp_path }],
    //       },
    //     },
    //   },
    // }).then((res) => {
    //   console.log(res);
    // });
  });
};
