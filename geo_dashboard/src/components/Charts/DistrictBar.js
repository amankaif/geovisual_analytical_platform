import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Bar, Bubble } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

var featuresJson = [];

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const DistrictBar = (props) => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({
    labels: ["test"],
    datasets: [
      {
        label: "Dataset 1",
        data: [3],
      },
    ],
  });

  useEffect(() => {
    setLoading(true);
    (async () => {
      console.log("requesting features");
      await axios.get("http://localhost:5000/shp/features").then((res) => {
        console.log("features recieved");
        setLoading(false);
        featuresJson = res.data;

        var labels = [];
        var data = [];

        featuresJson.map((item) => {
          var properties = item.properties;
          labels.push(properties["dtname"]);
          //   console.log(labels);
          data.push(
            properties["2017s"] +
              properties["2018s"] +
              properties["2019s"] +
              properties["2020s"] +
              properties["2021s"]
          );
        });

        setChartData({
          ...chartData,
          labels: labels,
          datasets: [{ label: "Cumulative crime", data: data }],
        });
      });
    })();
  }, []);

  //   console.log("labels", labels);
  //   console.log("data", data);
  return (
    <>
      {loading ? <p>Loading...</p> : <Bar options={options} data={chartData} />}
    </>
  );
};

export default DistrictBar;
