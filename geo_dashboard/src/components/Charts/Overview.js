import React, { useEffect, useState } from "react";
import axios from "axios";

import Row from "react-bootstrap/Row";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Line } from "react-chartjs-2";

const Overview = (props) => {
  const [loading, setLoading] = useState(true);

  const [maxOverviewData, setMaxOverviewData] = useState([]);
  const [minOverviewData, setMinOverviewData] = useState([]);
  const [meanOverviewData, setMeanOverviewData] = useState([]);
  const [maxDistrict, setMaxDistrict] = useState({});

  var featuresJson;

  var max2017District = "default";
  var max2018District = "default";
  var max2019District = "default";
  var max2020District = "default";
  var max2021District = "default";

  useEffect(() => {
    setLoading(true);
    (async () => {
      console.log("requesting features");
      await axios.get("http://localhost:5000/shp/features").then((res) => {
        console.log("features recieved");
        setLoading(false);
        featuresJson = res.data;
        getOverviewAggregates();
        // console.log(featuresJson);
      });
    })();
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Colors
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const overviewlabels = ["2017", "2018", "2019", "2020", "2021"];

  const getOverviewAggregates = () => {
    var max2017 = 0;
    var max2018 = 0;
    var max2019 = 0;
    var max2020 = 0;
    var max2021 = 0;

    var max2017District = "default";
    var max2018District = "default";
    var max2019District = "default";
    var max2020District = "default";
    var max2021District = "default";

    var mean2017 = 99999999999;
    var mean2018 = 99999999999;
    var mean2019 = 99999999999;
    var mean2020 = 99999999999;
    var mean2021 = 99999999999;

    var min2017 = 0;
    var min2018 = 0;
    var min2019 = 0;
    var min2020 = 0;
    var min2021 = 0;

    var min2017District = "default";
    var min2018District = "default";
    var min2019District = "default";
    var min2020District = "default";
    var min2021District = "default";

    featuresJson.forEach((element) => {
      var properties = element.properties;

      mean2017 = +properties["2017s"];
      mean2018 = +properties["2018s"];
      mean2019 = +properties["2019s"];
      mean2020 = +properties["2020s"];
      mean2021 = +properties["2021s"];

      if (max2017 < properties["2017s"]) {
        max2017 = properties["2017s"];
        max2017District = `${properties["stname"]}, ${properties["dtname"]}`;
        // console.log(maxDistrict);
      } else if (min2017 > properties["2017s"] && properties["2017s"] != 0) {
        min2017 = properties["2017s"];
        min2017District = properties["dtname"];
      }
      if (max2018 < properties["2018s"]) {
        max2018 = properties["2018s"];
        max2018District = `${properties["stname"]}, ${properties["dtname"]}`;
        // console.log("2018", maxDistrict);
      } else if (min2018 > properties["2018s"] && properties["2018s"] != 0) {
        min2018 = properties["2018s"];
        min2018District = properties["dtname"];
      }
      if (max2019 < properties["2019s"]) {
        max2019 = properties["2019s"];
        max2019District = `${properties["stname"]}, ${properties["dtname"]}`;
        // console.log("2019", maxDistrict);
      } else if (min2019 > properties["2019s"] && properties["2019s"] != 0) {
        min2019 = properties["2019s"];
        min2019District = properties["dtname"];
      }
      if (max2020 < properties["2020s"]) {
        max2020 = properties["2020s"];
        max2020District = `${properties["stname"]}, ${properties["dtname"]}`;
        // console.log("2020", maxDistrict);
      } else if (min2020 > properties["2020s"] && properties["2020s"] != 0) {
        min2020 = properties["2020s"];
        min2020District = properties["dtname"];
      }
      if (max2021 < properties["2021s"]) {
        max2021 = properties["2021s"];
        max2021District = `${properties["stname"]}, ${properties["dtname"]}`;
        // console.log("2021", maxDistrict);
      } else if (min2021 > properties["2021s"] && properties["2021s"] != 0) {
        min2021 = properties["2021s"];
        min2021District = properties["dtname"];
      }
      setMaxDistrict({
        ...maxDistrict,
        2017: max2017District,
        2018: max2018District,
        2019: max2019District,
        2020: max2020District,
        2021: max2021District,
      });
    });

    mean2017 = mean2017 / 734;
    mean2018 = mean2018 / 734;
    mean2019 = mean2019 / 734;
    mean2020 = mean2020 / 734;
    mean2021 = mean2021 / 734;

    // console.log("max", [max2017, max2018, max2019, max2020, max2021]);
    setMaxOverviewData([max2017, max2018, max2019, max2020, max2021]);
    // console.log("min", [min2017, min2018, min2019, min2020, min2021]);
    setMinOverviewData([min2017, min2018, min2019, min2020, min2021]);
    setMeanOverviewData([mean2017, mean2018, mean2019, mean2020, mean2021]);
    // console.log(maxDistrict);
  };

  const overviewData = {
    labels: overviewlabels,
    datasets: [
      {
        label: "Maximum",
        data: maxOverviewData,
        // borderColor: "rgb(255, 99, 132)",
        // backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Mean",
        data: meanOverviewData,
        // borderColor: "rgb(53, 162, 235)",
        // backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Min",
        data: minOverviewData,
        // borderColor: "rgb(53, 162, 235)",
        // backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      {loading ? (
        <div className="p-6">Loading</div>
      ) : (
        <Row>
          <Line options={options} data={overviewData} />
          <p
            className="m-3 p-2"
            style={{
              textAlign: "left",
            }}
          >
            max 2017 = {maxDistrict["2017"]}
            <br />
            max 2018 = {maxDistrict["2018"]}
            <br />
            max 2019 = {maxDistrict["2019"]}
            <br />
            max 2020 = {maxDistrict["2020"]}
            <br />
            max 2021 = {maxDistrict["2021"]}
          </p>
        </Row>
      )}
    </>
  );
};

export default Overview;
