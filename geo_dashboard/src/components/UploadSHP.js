import React from "react";
import shp from "shpjs/dist/shp";
import axios from "axios";
// import { fs } from "file-system";

const UploadSHP = () => {
  const reader = new FileReader();
  var layer_name = "";
  const getFile = async (event) => {
    event.preventDefault();
    // console.log("hello");
    var file = document.getElementById("formShpFile").files[0];
    // console.log(event.target.files[0]);
    // var file = event.target.files[0];
    // console.log(event.target.files[0]);
    const formDataSHP = new FormData();
    // console.log(document.getElementById("layer_name").value);
    formDataSHP.append("layer_name", layer_name);
    formDataSHP.append("shp_file", file);
    axios({
      method: "post",
      url: "http://localhost:5000/shp/upload",
      data: formDataSHP,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formDataSHP._boundary}`,
      },
    }).then((res) => {
      console.log(res);
    });
    const buffer = file.arrayBuffer().then(async (buffer) => {
      console.log(buffer);
      // fs.appendFile("../temp/${file.name}", Buffer.from(buffer));
      const GeoJSON = await shp(buffer);
      console.log(GeoJSON);
      // shp(buffer).then((res) => console.log(res));
      // const GeoJSON = await shp(buffer);
    });

    // axios.post("/upload_shp", file);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="w-50 mb-3 p-5">
        <form className="form-group" onSubmit={getFile}>
          <label className="form-label my-3">Upload SHP file</label>
          <input
            className="form-control"
            type="file"
            accept=".zip"
            id="formShpFile"
            // onChange={getFile}
          />
          <br></br>
          <input
            className="form-control"
            type="text"
            id="layer_title"
            onChange={(event) => {
              layer_name = event.target.value;
            }}
            placeholder="Layer name"
          ></input>
          <br></br>
          <button className="btn btn-primary" type="submit">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadSHP;
