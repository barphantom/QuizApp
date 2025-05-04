import styles from '../styles/Navbar.module.css';
import logo from '../assets/logo.png';
import plIcon from '../assets/pl.png';
import { Link } from 'react-router-dom';


export default function Navbar() {

  return (
    <nav className={styles.navbar}>
        <Link to="/" className={styles.logoLink}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </Link>
        <img src={plIcon} alt="PL" className={styles.plIcon} />
    </nav>
  );
}
