import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../ui/pages/login';
import MainLayout from 'ui/layouts/MainLayout';

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes;