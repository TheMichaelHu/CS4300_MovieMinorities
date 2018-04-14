import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { ChatalyticsApp } from "./components/chatalytics_app";

var mountNode = document.getElementById("app");
ReactDOM.render(
  <BrowserRouter>
    <ChatalyticsApp />
  </BrowserRouter>,
  mountNode
);
