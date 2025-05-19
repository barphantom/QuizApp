import styles from '../styles/Home.module.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import {useState} from "react";
import api from "../api.js";

export default function Home() {
  const navigate = useNavigate();
  const [code, setCode] = useState("")

  const handleSubmit = (e) => {
      e.preventDefault()

      if (code.length !== 6) {
          alert("Kod musi mieć dokładnie 6 znaków.")
          return
      }

      api
          .get(`/api/quizzes/join/${code}/`)
          .then((response) => {
              const quiz = response.data
              navigate(`/fill-out-quiz/${code}`, { state: {quiz} })
          })
          .catch((error) => {
              console.log("Wystąpił błąd przy dołączniu do quizu.", error)
              alert("Wystąpił błąd przy dołączniu do quizu. Spróbuj jeszcze raz.")
          })
  }

  return (
    <div>
      <nav className={styles.navbar}>
              <img src={logo} alt="Logo" className={styles.logo} />
              <div className={styles.navLinks}>
                <button onClick={() => navigate("/login")}>Sign in</button>
                <button onClick={() => navigate("/register")}>Sign up</button>
              </div>
          </nav>
        <h2 className={styles.mainText}>Wpisz kod aby dołączyć do quizu:</h2>
        <form className={styles.codeForm} onSubmit={handleSubmit}>
            <input type="text"
                   name="kod"
                   value={code}
                   onChange={(e) => setCode(e.target.value)}
                   placeholder="kod quizu"
                   required/>
        </form>
    </div>
  );
}