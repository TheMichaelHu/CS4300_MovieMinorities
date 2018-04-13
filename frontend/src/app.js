import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { MovieMinoritiesApp } from "./components/mm_app";

import { Provider } from 'react-redux';

import mmStore from './stores/mm_store';

const store = mmStore();

var mountNode = document.getElementById("app");
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <MovieMinoritiesApp />
    </Provider>
  </BrowserRouter>,
  mountNode
);
