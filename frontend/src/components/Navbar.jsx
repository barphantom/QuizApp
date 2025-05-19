import styles from '../styles/Navbar.module.css';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';


export default function Navbar() {
    const navigate = useNavigate()

    return (
      <nav className={styles.navbar}>
          <Link to="/" className={styles.logoLink}>
              <img src={logo} alt="Logo" className={styles.logo}/>
          </Link>
          <div className={styles.buttonDiv}>
              <button className={styles.logoutBtn} onClick={() => navigate("/login")}>Log in</button>
              <button className={styles.logoutBtn} onClick={() => navigate("/logout")}>Log out</button>
          </div>
      </nav>
    );
}
