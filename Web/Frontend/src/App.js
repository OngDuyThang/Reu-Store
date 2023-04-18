import React, { useState } from 'react';
import { useEffect } from "react";
import Home from "../src/pages/Home";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetail";
import RegisterAndLogin from "./pages/RegisterAndLogin";
import Cart from "./pages/Cart";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function App() {
  const { currentUser } = useSelector(state => state.user)
  console.log('appjs', currentUser)
  return (
    <BrowserRouter>
      <Routes>
        {/* 👇️ redirect to /home when user goes to / */}
        <Route path="/" element={currentUser ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/home" element={currentUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={currentUser ? <Navigate to="/home" /> : <RegisterAndLogin />} />
        <Route path="/products/:category" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        {/* 👇️ only match this when no other routes match */}
        <Route
          path="*"
          element={
            <div>
              <h1>404 Page not found</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};