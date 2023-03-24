const fetchSHP = () => {
  shp("files/pandr.zip").then(function (geojson) {
    console.log("hello");
    console.log(geojson);
  });
};
