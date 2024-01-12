import React from 'react';
import ShipRender from './components/ships/ShipRender';
import NavigationRender from './components/nav/NavigationRender';
import ErrorPage from "./routes/error_page";
import Login from "./components/auth/Login";
import Stars from './components/style/Stars';
import UserInfo from './components/user/UserInfo';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { AuthContextProvider } from './components/auth/authContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/fleet",
    element: <ShipRender />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/navigation",
    element: <NavigationRender />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user",
    element: <UserInfo />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <AuthContextProvider>
    <Stars />
    <main className="content">
      <RouterProvider router={router} >
      </RouterProvider>
    </main>
    </AuthContextProvider>
  );
}

export default App;
