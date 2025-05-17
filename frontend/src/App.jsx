import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import NotFoundPage from "./NotFoundPage.jsx";
import AdminDashboard from './pages/AdminDashboard.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Layout from "./components/Layout.jsx"
import Quizzes from "./components/Quizzes.jsx";
import QuizDetails from "./pages/QuizDetails.jsx";
import CreateQuiz from "./pages/CreateQuiz.jsx";
import EditQuiz from "./pages/EditQuiz.jsx";
import FillOutQuiz from "./pages/FillOutQuiz.jsx";
import QuizResults from "./pages/QuizResults.jsx";

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
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/register" element={<RegisterAndLogout/>}/>
                <Route path="/fill-out-quiz/:code" element={<FillOutQuiz/>}/>
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <AdminDashboard/>
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/quizzes"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Quizzes/>
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/quizzes/:quizId"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <QuizDetails/>
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/create-quiz"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <CreateQuiz/>
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/quizzes/edit/:quizId"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <EditQuiz/>
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/quizzes/results/:quizId"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <QuizResults/>
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
