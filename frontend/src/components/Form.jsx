import {useState} from "react";
import api from "../api.js";
import {useNavigate} from "react-router-dom";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants.js";
import styles from '../styles/Form.module.css'
import LoadingIndicator from "./LoadingIndicator.jsx";
import googleLogo from '../assets/google.png';


export default function Form({ route, method }) {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [nickName, setNickName] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Sign in" : "Sign up"

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        const payload = (method === "register")
            ? { email, first_name: firstName, last_name: lastName, nickname: nickName, password }
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
                <div>
                    <input      /* nickname */
                        className={styles.formInput}
                        type="text"
                        value={nickName}
                        onChange={(e) => {
                            setNickName(e.target.value)
                        }}
                        placeholder="Username"
                    />
                    <input      /* first_name */
                        className={styles.formInput}
                        type="text"
                        value={firstName}
                        onChange={e => {
                            setFirstName(e.target.value)
                        }}
                        placeholder="First name"
                    />
                    <input      /* last_name */
                        className={styles.formInput}
                        type="text"
                        value={lastName}
                        onChange={e => {
                            setLastName(e.target.value)
                        }}
                        placeholder="Last name"
                    />
                </div>
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

            {/*Action button*/}
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

