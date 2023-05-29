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

var formState = "COUNTRY";
var formYear = "Cumulative";

const StateView = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    setLoading(true);
    (async () => {
      axios.get("http://localhost:5000/shp/state_wise").then((res) => {
        stateWiseDataObject = res.data;
        // console.log(Object.keys(stateWiseDataObject));
        // setLoading(false);
        setChartData({
          labels: Object.keys(stateWiseDataObject),
          datasets: [
            {
              label: "Total crime for state/district overall",
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
          //   console.log(stateWiseDistrictsObject);
          // console.log(Object.keys(stateWiseDataObject));
          setLoading(false);
          //   console.log("done loading", loading);
        });
    })();
  }, []);

  ChartJS.register(ArcElement, Tooltip, Legend, Colors);

  const handleFormState = (e) => {
    formState = e.currentTarget.value;
    // console.log(formState);
  };

  const handleChartDataUpdate = () => {
    var allData = [];
    var allLabels = [];
    if (formState == "COUNTRY") {
      allLabels = Object.keys(stateWiseDataObject);
      if (formYear == "Cumulative") {
        Object.keys(stateWiseDataObject).map((state) => {
          var sum = 0;
          Object.keys(stateWiseDataObject[state]).map((year) => {
            sum += stateWiseDataObject[state][year];
          });
          allData.push(sum);
        });

        // data.datasets[0].data = allData;
        // console.log("dataset data Cum", chartData.datasets[0].data);
      } else {
        Object.keys(stateWiseDataObject).map((state) => {
          allData.push(stateWiseDataObject[state][formYear]);
        });
      }
    } else {
      allLabels = Object.keys(stateWiseDistrictsObject[formState]);
      if (formYear == "Cumulative") {
        Object.keys(stateWiseDistrictsObject[formState]).map((district) => {
          console.log(district);
          var sum = 0;
          Object.keys(stateWiseDistrictsObject[formState][district]).map(
            (year) => {
              sum += stateWiseDistrictsObject[formState][district][year];
            }
          );
          allData.push(sum);
        });
      } else {
        // console.log(formState);
        // console.log(stateWiseDistrictsObject);
        Object.keys(stateWiseDistrictsObject[formState]).map((district) => {
          console.log(district);
          allData.push(stateWiseDistrictsObject[formState][district][formYear]);
        });
      }
    }
    setChartData({
      ...chartData,
      labels: allLabels,
      datasets: [{ ...chartData.datasets[0], data: allData }],
    });
  };

  const handleFormYear = (e) => {
    formYear = e.currentTarget.value;
    // handleChartDataUpdate();
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
                  [
                    "COUNTRY",
                    ...Object.keys(stateWiseDataObject).toSorted(),
                  ].map((item) => (
                    <option id={item} value={item}>
                      {item}
                    </option>
                  )),
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
            <div
              className="btn btn-primary m-2"
              onClick={handleChartDataUpdate}
            >
              Go
            </div>
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
