import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { Toaster } from "react-hot-toast";
import AppRoute from "./route/AppRoute.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster position='top-right' reverseOrder={false} />
      <AppRoute />
    </Provider>
  </React.StrictMode>
);
