import {useState} from "react";
import api from "../api.js";
import {useNavigate} from "react-router-dom";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants.js";
import styles from '../styles/Form.module.css'
import LoadingIndicator from "./LoadingIndicator.jsx";


export default function Form({ route, method }) {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            const response = await api.post(route, { username: userName, password: password })
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
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h1>{name}</h1>
            <input
                className={styles.formInput}
                type="text"
                value={userName}
                onChange={(e) => {
                    setUserName(e.target.value)
                }}
                placeholder="Username"
            />
            <input
                className={styles.formInput}
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
                placeholder="Password"
            />
            { loading && <LoadingIndicator /> }
            <button className={styles.formButton} type="submit">{name}</button>
        </form>
    )
}

