import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import NotFoundPage from "./NotFoundPage.jsx";
import Home2 from './pages/Home2';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from "./components/ProtectedRoute.jsx";


function Logout() {
    localStorage.clear()
    return <Navigate to="/login/" />
}

function RegisterAndLogout() {
    localStorage.clear()
    return <Register />
}

function App() {

  return (
    <BrowserRouter >
        <Routes>
            <Route
                path="/"
                element={
                <ProtectedRoute>
                    <Home2 />
                </ProtectedRoute>
                }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<RegisterAndLogout />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
