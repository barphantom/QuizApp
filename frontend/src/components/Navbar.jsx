import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/login" className={styles.loginButton}>
        Zaloguj się
      </Link>
    </nav>
  );
}
