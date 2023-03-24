import React from 'react'
import shp from 'shpjs';

const fetchSHP = () => {
    shp("files/pandr.zip").then(function(geojson){
		console.log(geojson);
	});
}

const Charts = () => {
  return (
    <div>Charts</div>
  )
}

export default Charts