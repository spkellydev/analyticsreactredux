import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import "jquery";
import "popper.js";
import "bootstrap/dist/js/bootstrap.min.js";

import App from "./components/App";
import Root from "./Root";
import "./assets/css/assets/main.css";

ReactDOM.render(
  <Root>
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  </Root>,
  document.getElementById("root")
);
