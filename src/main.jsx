import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Tester from "./component/Tester";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
    {/* <Tester /> */}
  </BrowserRouter>,
  document.getElementById("root")
);
