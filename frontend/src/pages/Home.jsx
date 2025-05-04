import styles from '../styles/Home.module.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <nav className={styles.navbar}>
              <img src={logo} alt="Logo" className={styles.logo} />
              <div className={styles.navLinks}>
                <button onClick={() => navigate("/login")}>Sign in</button>
                <button onClick={() => navigate("/register")}>Sign up</button>
              </div>
          </nav>
    </div>
  );
}