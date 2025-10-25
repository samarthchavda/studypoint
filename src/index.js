import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { thunk } from "redux-thunk";
const root = ReactDOM.createRoot(document.getElementById("root"));
if (typeof window !== 'undefined') {
  window.process = {
    env: {
      NODE_ENV: process.env.NODE_ENV || 'development',
    },
  };
}
const store = configureStore({
  reducer: rootReducer,
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(thunk),
});
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App/>
        <Toaster/>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
