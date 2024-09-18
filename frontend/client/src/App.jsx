// main.jsx (or index.jsx)
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; 
import App from "./App";
import store from "../src/redux/store"; // Import your store

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>/
    <Provider store={store}>
      {" "}
      {/* Wrap your App with the Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);
