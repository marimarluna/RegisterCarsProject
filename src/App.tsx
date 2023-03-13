import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import StoreProvider, { useContextStore } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalRegisterEntry from './components/ModalRegisterEntry';
import DetailsVehicle from './pages/DetailsVehicle';



function NavbarWrapper() {

  return (
    <StoreProvider>
      <NavBar />
      <Outlet />
      <ToastContainer />
      <ModalRegisterEntry />
    </StoreProvider>
  )
};

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavbarWrapper />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/detail/:id",
          element: <DetailsVehicle />
        },
      ]
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
