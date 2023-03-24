import shp from 'shpjs';

const fetchSHP = () => {
    shp("files/pandr.zip").then(function(geojson){
		console.log(geojson);
	});
}