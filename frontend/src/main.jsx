import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import NotFoundPage from "./NotFoundPage.jsx";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const router = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <App />,
    //     children: [
    //         { index: true, element: <Home /> },
    //         { path: 'loginn', element: <Login /> },
    //         { path: 'registerr', element: <Register /> },
    //     ],
    // },
    {path: "/", element: <App />},
    {path: "/login", element: <Login />},
    {path: "/register", element: <Register />},
    {path: "*", element: <NotFoundPage />},
]);

// konfiguracja rutera
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
