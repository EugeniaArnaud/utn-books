import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";

import Crud from "./routes/Crud";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Layout from "./Layout";
import HomeCrud from "./routes/HomeCrud";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Cruds from "./routes/Cruds";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/homecrud" element={<HomeCrud />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/crud"
            element={
              <ProtectedRoute>
                <Crud />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/cruds/:id"
            element={
              <ProtectedRoute>
                <Cruds />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="*"
            element={
              <div>
                <p> Not Found😣😎 </p>
              </div>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
