import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from 'ui/layouts/MainLayout';
import Authentication from 'ui/pages/authentication';

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<Authentication />} />
        <Route path='*' element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes;