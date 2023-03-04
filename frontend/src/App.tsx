import { Login } from "@mui/icons-material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppToolbar from "./components/AppToolBar/AppToolBar";
import Register from "./features/user/Register";

function App() {
  return (
    <div className="App">
      <AppToolbar />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
