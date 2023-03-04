import { Container } from "@mui/system";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppToolbar from "./components/AppToolBar/AppToolBar";
import AddNewItem from "./containers/AddNewItem/AddNewItem";
import CategoriItems from "./containers/CategoriItems/CategoriItems";
import Main from "./containers/Main/Main";
import OneItem from "./containers/OneItem/OneItem";
import Login from "./features/user/Login";
import Register from "./features/user/Register";

function App() {
  return (
    <div className="App">
      <AppToolbar />

      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:id" element={<OneItem />} />
          <Route path="/category/:name" element={<CategoriItems />} />
          <Route path="/newItem" element={<AddNewItem />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h2>Not Found !</h2>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
