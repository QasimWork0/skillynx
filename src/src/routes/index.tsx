import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Authenticator from 'ui/containers/Authenticator';
import MainLayout from 'ui/layouts/MainLayout';
import Authentication from 'ui/pages/authentication';

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<Authenticator> <Authentication /> </Authenticator>} />
        <Route path='*' element={<Authenticator> <MainLayout /> </Authenticator>} />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes;