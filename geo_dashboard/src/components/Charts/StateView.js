import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormSelect from "react-bootstrap/FormSelect";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import axios from "axios";

var stateWiseDataObject = {};
var stateWiseDistrictsObject = {};

var formState = "default";
var formYear = "All";

const StateView = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    setLoading(true);
    (async () => {
      await axios.get("http://localhost:5000/shp/state_wise").then((res) => {
        stateWiseDataObject = res.data;
        // console.log(Object.keys(stateWiseDataObject));
        // setLoading(false);
        setChartData({
          labels: Object.keys(stateWiseDataObject),
          datasets: [
            {
              label: "Total crime for state overall",
              data: [12, 19, 3, 5, 2, 3],

              borderWidth: 1,
            },
          ],
        });
        //   console.log("done loading", loading);
      });
      await axios
        .get("http://localhost:5000/shp/state_wise_districts")
        .then((res) => {
          stateWiseDistrictsObject = res.data;
          // console.log(Object.keys(stateWiseDataObject));
          setLoading(false);
          //   console.log("done loading", loading);
        });
    })();
  }, []);

  ChartJS.register(ArcElement, Tooltip, Legend, Colors);

  const handleFormState = (e) => {
    formState = e.currentTarget.value;
    console.log(formState);
  };

  const handleChartDataUpdate = (formYear) => {
    if (formYear == "Cumulative") {
      if (formState == "COUNTRY") {
        var allData = [];
        Object.keys(stateWiseDataObject).map((state) => {
          var sum = 0;
          Object.keys(stateWiseDataObject[state]).map((year) => {
            sum += stateWiseDataObject[state][year];
          });
          allData.push(sum);
        });

        setChartData({
          ...chartData,
          labels: Object.keys(stateWiseDataObject),
          datasets: [{ ...chartData.datasets[0], data: allData }],
        });
        // data.datasets[0].data = allData;
        console.log("dataset data Cum", chartData.datasets[0].data);
      }
    }
  };

  const handleFormYear = (e) => {
    formYear = e.currentTarget.value;
    console.log(formYear);

    switch (formYear) {
      case "Cumulative":
        if (formState == "COUNTRY") {
          var allData = [];
          Object.keys(stateWiseDataObject).map((state) => {
            var sum = 0;
            Object.keys(stateWiseDataObject[state]).map((year) => {
              sum += stateWiseDataObject[state][year];
            });
            allData.push(sum);
          });

          setChartData({
            ...chartData,
            labels: Object.keys(stateWiseDataObject),
            datasets: [{ ...chartData.datasets[0], data: allData }],
          });
          // data.datasets[0].data = allData;
          console.log("dataset data Cum", chartData.datasets[0].data);
        } else {
          const mainDataObject = 0;

          var allData = [];
          Object.keys(mainDataObject).map((state) => {
            var sum = 0;
            Object.keys(mainDataObject[state]).map((year) => {
              sum += mainDataObject[state][year];
            });
            allData.push(sum);
          });

          setChartData({
            ...chartData,
            labels: Object.keys(mainDataObject),
            datasets: [{ ...chartData.datasets[0], data: allData }],
          });
          // data.datasets[0].data = allData;
          console.log("dataset data Cum", chartData.datasets[0].data);
        }

        // setReRender(true);

        break;

      case "2017":
        var data2017 = [];

        Object.keys(stateWiseDataObject).map((state) => {
          data2017.push(stateWiseDataObject[state]["2017"]);
        });

        setChartData({
          ...chartData,
          labels: Object.keys(stateWiseDataObject),
          datasets: [{ ...chartData.datasets[0], data: data2017 }],
        });
        // data.datasets[0].data = allData;
        console.log("dataset data 2017", chartData.datasets[0].data);
        break;

      case "2018":
        var data2018 = [];

        Object.keys(stateWiseDataObject).map((state) => {
          data2018.push(stateWiseDataObject[state]["2018"]);
        });

        setChartData({
          ...chartData,
          labels: Object.keys(stateWiseDataObject),
          datasets: [{ ...chartData.datasets[0], data: data2018 }],
        });
        // data.datasets[0].data = allData;
        console.log("dataset data 2018", chartData.datasets[0].data);
        break;
      case "2019":
        var data2019 = [];

        Object.keys(stateWiseDataObject).map((state) => {
          data2019.push(stateWiseDataObject[state]["2019"]);
        });

        setChartData({
          ...chartData,
          labels: Object.keys(stateWiseDataObject),
          datasets: [{ ...chartData.datasets[0], data: data2019 }],
        });
        // data.datasets[0].data = allData;
        console.log("dataset data 2019", chartData.datasets[0].data);
        break;
      case "2020":
        var data2020 = [];

        Object.keys(stateWiseDataObject).map((state) => {
          data2020.push(stateWiseDataObject[state]["2020"]);
        });

        setChartData({
          ...chartData,
          labels: Object.keys(stateWiseDataObject),
          datasets: [{ ...chartData.datasets[0], data: data2020 }],
        });
        // data.datasets[0].data = allData;
        console.log("dataset data 2020", chartData.datasets[0].data);
        break;
      case "2021":
        var data2021 = [];

        Object.keys(stateWiseDataObject).map((state) => {
          data2021.push(stateWiseDataObject[state]["2021"]);
        });

        setChartData({
          ...chartData,
          labels: Object.keys(stateWiseDataObject),
          datasets: [{ ...chartData.datasets[0], data: data2021 }],
        });
        // data.datasets[0].data = allData;
        console.log("dataset data 2021", chartData.datasets[0].data);
        break;
    }
  };

  return (
    <>
      {loading ? (
        <div className="p-6">Loading</div>
      ) : (
        <Col
          style={{
            alignContent: "center",
            backgroundColor: "rgba(198, 201, 207, 0.2)",
            height: "1000",
          }}
          className="p-4 m-2 rounded"
        >
          {/* <div className="m-3"> */}
          <Form id="mainForm" className="m-3">
            {/* <Col className="p-2 m-2"> */}
            <Form.Group as={Row} controlId="formStateDropdown">
              <Form.Select
                className="m-2"
                defaultValue="Choose State..."
                onChange={handleFormState}
              >
                {/* <option>CASH-IN</option> */}
                {/* <option id="transactionTypeCash" value="cash">
                      CASH_OUT
                    </option> */}
                {[
                  ["COUNTRY", ...Object.keys(stateWiseDataObject)].map(
                    (item) => (
                      <option id={item} value={item}>
                        {item}
                      </option>
                    )
                  ),
                ]}
              </Form.Select>

              <Form.Select
                className="m-2"
                defaultValue="Choose State..."
                onChange={handleFormYear}
              >
                {["Cumulative", "2017", "2018", "2019", "2020", "2021"].map(
                  (item) => (
                    <option id={item} value={item}>
                      {item}
                    </option>
                  )
                )}
              </Form.Select>
            </Form.Group>
            {/* </Col> */}
          </Form>

          {/* {Object.keys(stateWiseDataObject).map((item) => (
              <a class="dropdown-item" href="#">
                {item}
              </a>
            ))} */}
          {/* </div> */}

          <Doughnut
            options={{ responsive: "true" }}
            //   style={{ height: "100%" }}
            data={chartData}
          />
        </Col>
      )}
    </>
  );
};

export default StateView;
