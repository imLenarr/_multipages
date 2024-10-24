import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout/Layout/Layout";
import Login from "./Pages/Login/Login";

import Home from "./Pages/Home/Home";
import Calculator from "./Pages/Calculator/Calculator";
import Animation from "./Pages/Animation/Animation";
import Components from "./Pages/Components/Components";
import ToDo from "./Pages/ToDo/ToDo";
import Products from "./Pages/products/Products";
import Carts from "./Pages/Carts/Carts";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { fetchProducts } from "./data/products";

import "./App.css";

// HashRouter , BrowserRouter , MemoryRouter
// localhost:5173/#/<paths>   // HashRouter      * compatable old
// localhost:5173/<paths>     // BrowserRouter   * production
// localhost:5173             // MemoryRouter

// App -> Layout -> Navbar (buttons)
// tab -> (props)

function App() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => setProducts(fetchProducts()), []);
  useEffect(() => console.log(products), [products]);

  if (token === "") {
    return <Login setToken={setToken} setRole={setRole} />;
  } else {
    return (
      <div className="app-container">
        <HashRouter>
          <Routes>
            <Route
              element={
                <Layout products={products} carts={carts} setToken={setToken} />
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/animation" element={<Animation />} />
              <Route path="/components" element={<Components />} />
              <Route path="/todo" element={<ToDo />} />
              <Route
                path="/products"
                element={
                  <Products
                    products={products}
                    carts={carts}
                    setCarts={setCarts}
                  />
                }
              />
              <Route
                path="/carts"
                element={<Carts carts={carts} setCarts={setCarts} />}
              />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    );
  }
}

export default App;
