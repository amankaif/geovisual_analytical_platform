import React from "react";
import shp from "shpjs/dist/shp";
import axios from "axios";

const UploadSHP = () => {
  const reader = new FileReader();
  const getFile = async (event) => {
    // console.log("hello");
    var file = event.target.files[0];
    console.log(event.target.files[0]);
    const buffer = file.arrayBuffer().then((res) => {
      console.log(res);
      const GeoJSON = shp(res);
      GeoJSON.then(console.log(GeoJSON.result));
      console.log();
    });

    // axios.post("/upload_shp", file);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="w-50 mb-3 p-5">
        <form className="form-group">
          <label className="form-label my-3">Upload SHP file</label>
          <input
            className="form-control"
            type="file"
            accept=".zip"
            id="formFile"
            onChange={getFile}
          />
          <br></br>
          {/* <button type="Submit" className="btn btn-primary">
          Submit
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default UploadSHP;
