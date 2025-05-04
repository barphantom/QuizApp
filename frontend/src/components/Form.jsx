import {useState} from "react";
import api from "../api.js";
import {useNavigate} from "react-router-dom";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants.js";
import styles from '../styles/Form.module.css'
import LoadingIndicator from "./LoadingIndicator.jsx";
import googleLogo from '../assets/google.png';


export default function Form({ route, method }) {
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Sign in" : "Sign up"

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        const payload = method === "register"
        ? { username: userName, password, email }
        : { email, password };

        try {
            const response = await api.post(route, payload)
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
            console.log(error.response.data)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h1>{name}</h1>
            <input
                className={styles.formInput}
                type="email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
                placeholder="Email"
            />
            { method === "register" && (
                <input
                    className={styles.formInput}
                    type="text"
                    value={userName}
                    onChange={(e) => {
                        setUserName(e.target.value)
                    }}
                    placeholder="Username"
                />
            )}
            <input
                className={styles.formInput}
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
                placeholder="Password"
            />
            {method === "login" && (
                <div className={styles.forgotPassword}>
                    <a href="/reset-password">Forgot password?</a>
                </div>
            )}

            { loading && <LoadingIndicator /> }
            <button className={styles.formButton} type="submit">{name}</button>

            { method === "login" && (
                <>
                <div className={styles.registerLink}>
                    Don't have an account?&nbsp;&nbsp;<a href="/register">Sign Up</a>
                </div>
                </>
            )}

            <button type="button" className={styles.googleButton}
            onClick={() => window.location.href = "http://localhost:8000/api/auth/google/"}>
            <img src={googleLogo} alt="Sign in with Google" className={styles.googleIcon}/> </button>


        </form>
        </div>
    )
}

