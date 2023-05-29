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

var formState = "default";
var formYear = "All";

const StateView = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      await axios.get("http://localhost:5000/shp/state_wise").then((res) => {
        stateWiseDataObject = res.data;
        // console.log(Object.keys(stateWiseDataObject));
        setLoading(false);
        //   console.log("done loading", loading);
      });
    })();
  }, []);

  ChartJS.register(ArcElement, Tooltip, Legend, Colors);

  const handleFormState = (e) => {
    formState = e.currentTarget.value;
  };

  const handleFormYear = (e) => {
      formYear = e.currentTarget.value;
      
  };

  const data = {
    labels: Object.keys(stateWiseDataObject),
    datasets: [
      {
        label: "Total crime for state overall",
        data: [12, 19, 3, 5, 2, 3],
        // backgroundColor: [
        //   "rgba(255, 99, 132, 0.2)",
        //   "rgba(54, 162, 235, 0.2)",
        //   "rgba(255, 206, 86, 0.2)",
        //   "rgba(75, 192, 192, 0.2)",
        //   "rgba(153, 102, 255, 0.2)",
        //   "rgba(255, 159, 64, 0.2)",
        // ],
        // borderColor: [
        //   "rgba(255, 99, 132, 1)",
        //   "rgba(54, 162, 235, 1)",
        //   "rgba(255, 206, 86, 1)",
        //   "rgba(75, 192, 192, 1)",
        //   "rgba(153, 102, 255, 1)",
        //   "rgba(255, 159, 64, 1)",
        // ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {loading ? (
        <div className="p-6">Loading</div>
      ) : (
        <Col className="p-2">
          <div className="m-3">
            <Form id="mainForm">
              <Col className="p-2 m-2">
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
                    {Object.keys(stateWiseDataObject).map((item) => (
                      <option id={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Form.Select>

                  <Form.Select
                    className="m-2"
                    defaultValue="Choose State..."
                    onChange={handleFormYear}
                  >
                    {["Total", "2017", "2018", "2019", "2020", "2021"].map(
                      (item) => (
                        <option id={item} value={item}>
                          {item}
                        </option>
                      )
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Form>

            {/* {Object.keys(stateWiseDataObject).map((item) => (
              <a class="dropdown-item" href="#">
                {item}
              </a>
            ))} */}
          </div>
          <div
            style={{
              alignContent: "center",
            }}
            className="m-3"
          >
            <Doughnut data={data} />
          </div>
        </Col>
      )}
    </>
  );
};

export default StateView;
