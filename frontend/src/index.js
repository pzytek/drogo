import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/themes.css";
import "./assets/styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Temp from "./components/Temp";
import ProductScreen from "./screens/ProductScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomeScreen />} />
      <Route path="login" element={<Login />} />
      <Route path="cart" element={<Cart />} />
      <Route path="temp" element={<Temp />} />
      <Route path="product/:id" element={<ProductScreen />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
