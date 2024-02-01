import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Routes as MainRoutes } from '../entities/routes'

export default function AllRoutes() {
  return (
    <Routes>
      {
        MainRoutes.map((route, routeIndex) => (
          <React.Fragment key={routeIndex}>
            {
              route.children ?
                <Route path={route.link} >
                  <Route index element={route.component} />
                  {
                    route.children.map((child, childIndex) => (
                      <Route key={childIndex} path={child.link} element={child.component} />
                    ))
                  }
                </Route>
                :
                <Route path={route.link} element={route.component} />
            }
          </React.Fragment>
        ))
      }
      <Route path={'*'} element={<Navigate to={'/home'} replace />} />
    </Routes>
  )
}
