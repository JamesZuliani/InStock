import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import Warehouse from "./pages/Warehouse/Warehouse";
import Inventory from "./pages/Inventory";
import EditWarehouse from "./pages/EditWarehouse";
import EditInventory from "./pages/EditInventory";
import AddNewWarehouse from "./pages/AddNewWarehouse";
import AddNewInventory from "./pages/AddNewInventory";
import { useEffect, useState } from 'react';
import axios from "axios";


function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Warehouse />} />
        <Route path="warehouse" element={<Warehouse />} />
        <Route path="warehouse/:id" element={<Warehouse />} /> 
        <Route path="warehouse/:id/edit" element={<EditWarehouse />} />
        <Route path="warehouse/new" element={<AddNewWarehouse />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="inventory/:id" element={<Inventory />} />
        <Route path="inventory/:id/edit" element={<EditInventory />} />
        <Route path="inventory/new" element={<AddNewInventory />} />
      </Routes>
      <Footer />
    </BrowserRouter >
  );
}

export default App;
